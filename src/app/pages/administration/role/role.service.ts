import { Injectable, Injector, Input, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject, timer } from 'rxjs';
import { debounce, debounceTime, delay, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { RoleSortDirection, RoleSortColumn } from '../role/role.directive';
import { PagedResultDto } from '@abp/ng.core';
import { IdentityRoleDto, IdentityRoleService } from '@abp/ng.identity/proxy';
import { Router } from '@angular/router';

interface SearchResult {
    tables: IdentityRoleDto[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: RoleSortColumn;
    sortDirection: RoleSortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
    debounce: number;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

/**
 * Sort the table data
 * @param tables field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(tables: IdentityRoleDto[], column: any, direction: string): IdentityRoleDto[] {
    if (direction === '' || column === '') {
        return tables;
    } else {
        return [...tables].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

/**
 * Table Data Match with Search input
 * @param table field value fetch
 * @param term Search the value
 */
function matches(table: IdentityRoleDto, term: string, pipe: PipeTransform) {
    return  table.name.toLowerCase().includes(term)
}

@Injectable({
    providedIn: 'root'
})

export class RoleService {
    data: PagedResultDto<IdentityRoleDto> = { items: [], totalCount: 0 };

    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _tables$ = new BehaviorSubject<IdentityRoleDto[]>([]);
    // tslint:disable-next-line: variable-name
    private _total$ = new BehaviorSubject<number>(0);
    // tslint:disable-next-line: variable-name
    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        startIndex: 0,
        endIndex: 9,
        totalRecords: 0,
        debounce: 10000
    };

    protected router: Router;
    protected service: IdentityRoleService;
    
    constructor(private pipe: DecimalPipe, protected injector: Injector) {
        this.router = injector.get(Router);
        this.service = injector.get(IdentityRoleService);

        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounce(()=>timer(this.debounce)),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._tables$.next(result.tables);
            this._total$.next(result.total);
        });
        this._search$.next();
    }

    /**
     * Returns the value
     */
    get tables$() { return this._tables$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get debounce() { return this._state.debounce; }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    get startIndex() { return this._state.startIndex; }
    get endIndex() { return this._state.endIndex; }
    get totalRecords() { return this._state.totalRecords; }

    /**
     * set the value
     */
    // tslint:disable-next-line: adjacent-overload-signatures
    set debounce(debounce: number) { this._set({ debounce }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set page(page: number) { this._set({ page }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set startIndex(startIndex: number) { this._set({ startIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set endIndex(endIndex: number) { this._set({ endIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: RoleSortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: RoleSortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    /**
     * Search Method
     */
    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let tables = sort(this.getRoleList(), sortColumn, sortDirection);

        // 2. filter
        tables = tables.filter(table => matches(table, searchTerm, this.pipe));
        const total = tables.length;

        // 3. paginate
        this.totalRecords = tables.length;
        this._state.startIndex = (page - 1) * this.pageSize + 1;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        tables = tables.slice(this._state.startIndex - 1, this._state.endIndex);
        return of(
            { tables, total }
        );
    }

    public getRoleList(): IdentityRoleDto[] {        
        // console.log(this.router.url);
        if (this.router.url === '/administration/privileges/manage') {
            this.service.getAllList()
                .subscribe(res => (
                    this.data = res
                ));
            
            // console.log(this.data.items);
            return this.data.items;
        }        
    }
}