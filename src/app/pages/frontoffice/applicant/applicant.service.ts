import { Injectable, Injector, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject, timer } from 'rxjs';
import { debounce, debounceTime, delay, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { ApplicantDto, PageCode } from '../applicant/applicant.model';
import { ApplicantSortDirection, ApplicantSortColumn } from '../applicant/applicant.directive';
import { ApiService } from 'src/app/core/services/api.service';
import { PagedResultDto } from '@abp/ng.core';
import { Router } from '@angular/router';

interface SearchResult {
    applicants: ApplicantDto[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    pageCode: number;
    searchTerm: string;
    searchParam: string;
    applicantId: string;
    sortColumn: ApplicantSortColumn;
    sortDirection: ApplicantSortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
    debounce: number;
    sprogress: boolean;
    strigger: boolean;
    lprogress: boolean;
    ltrigger: boolean;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

/**
 * Sort the table data
 * @param applicants field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */
function sort(applicants: ApplicantDto[], column: ApplicantSortColumn, direction: string): ApplicantDto[] {
    if (direction === '' || column === '') {
        return applicants;
    } else {
        return [...applicants].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

/**
 * Table Data Match with Search input
 * @param applicant field value fetch
 * @param term Search the value
 * @param pipe Search the value
 */

function matches(applicant: ApplicantDto, term: string, pipe: PipeTransform) {
    return applicant.surname.toLowerCase().includes(term)
        || applicant.firstName.toLowerCase().includes(term)
        || applicant.middleName.toLowerCase().includes(term)
        || applicant.gender.toLowerCase().includes(term)
        || applicant.birthDate.toLowerCase().includes(term)
        || applicant.nationality.toLowerCase().includes(term)
        || applicant.birthState.toLowerCase().includes(term)
        || applicant.nationalId.toLowerCase().includes(term)
        || applicant.appStatus.toLowerCase().includes(term);
}

@Injectable({
    providedIn: 'root'
})

export class ApplicantService {    
    data: PagedResultDto<ApplicantDto> = { items: [], totalCount: 0 };
    item: ApplicantDto;

    // tslint:disable-next-line: variable-name
    private _loading$ = new BehaviorSubject<boolean>(true);
    // tslint:disable-next-line: variable-name
    private _search$ = new Subject<void>();
    // tslint:disable-next-line: variable-name
    private _applicants$ = new BehaviorSubject<ApplicantDto[]>([]);
    // tslint:disable-next-line: variable-name
    private _total$ = new BehaviorSubject<number>(0);
    // tslint:disable-next-line: variable-name
    private _state: State = {
        page: 1,
        pageSize: 10,
        pageCode: 0,
        searchTerm: '',
        searchParam: '',
        applicantId: '',
        sortColumn: '',
        sortDirection: '',
        startIndex: 0,
        endIndex: 9,
        totalRecords: 0,
        debounce: 1000,
        sprogress: false,
        strigger: false,
        lprogress: false,
        ltrigger: false
    };

    protected router: Router;
    protected apiService: ApiService;

    constructor(private pipe: DecimalPipe, protected injector: Injector) {
        this.router = injector.get(Router);
        this.apiService = injector.get(ApiService);
        
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounce(()=>timer(this.debounce)),
            //debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._applicants$.next(result.applicants);
            this._total$.next(result.total);
        });
        this._search$.next();
    }

    /**
     * Returns the value
     */
    get applicants$() { return this._applicants$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get sprogress() { return this._state.sprogress; }
    get lprogress() { return this._state.lprogress; }
    get debounce() { return this._state.debounce; }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get pageCode() { return this._state.pageCode; }
    get searchTerm() { return this._state.searchTerm; }
    get searchParam() { return this._state.searchParam; }
    get applicantId() { return this._state.applicantId; }

    get startIndex() { return this._state.startIndex; }
    get endIndex() { return this._state.endIndex; }
    get totalRecords() { return this._state.totalRecords; }

    /**
     * set the value
     */
    // tslint:disable-next-line: adjacent-overload-signatures
    set debounce(debounce: number) { this._set({ debounce }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set progress(sprogress: boolean) { this._set({ sprogress: sprogress }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set strigger(strigger: boolean) { this._set({ strigger: strigger }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set lprogress(lprogress: boolean) { this._set({ lprogress: lprogress }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set ltrigger(ltrigger: boolean) { this._set({ ltrigger: ltrigger }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set page(page: number) { this._set({ page }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set pageCode(pageCode: number) { this._set({ pageCode }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set startIndex(startIndex: number) { this._set({ startIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set endIndex(endIndex: number) { this._set({ endIndex }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set searchParam(searchParam: string) { this._set({ searchParam }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set sortColumn(sortColumn: ApplicantSortColumn) { this._set({ sortColumn }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set sortDirection(sortDirection: ApplicantSortDirection) { this._set({ sortDirection }); }
    // tslint:disable-next-line: adjacent-overload-signatures
    set applicantId(applicantId: string) { this._set({ applicantId }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    /**
     * Search Method
     */
    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm, searchParam, pageCode } = this._state;
        
        if (pageCode == PageCode.PE) {
            this.getByPendingRegistrationList(searchParam);
        } else {
            this.getApplicantList(searchParam);
        }        

        // 1. sort
        let applicants = sort(this.data.items, sortColumn, sortDirection);

        // 2. filter
        applicants = applicants.filter(applicant => matches(applicant, searchTerm, this.pipe));
        const total = applicants.length;

        // 3. paginate
        this.totalRecords = applicants.length;
        this._state.startIndex = (page - 1) * this.pageSize + 1;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }
        applicants = applicants.slice(this._state.startIndex - 1, this._state.endIndex);
        return of(
            { applicants: applicants, total }
        );
    }

    public getApplicantList(searchParam?: string): ApplicantDto[] {
        if (searchParam.length == 0) {
            this._state.lprogress = this._state.ltrigger == true ? true : false;
            this.apiService.get(`/api/applicant/all-applicants`)
                .subscribe(res => (
                    this.data.items = res,
                    this._state.lprogress = false,
                    this._state.ltrigger = false
                ));
        } else {
            this._state.sprogress = this._state.strigger == true ? true : false;
            let filter = "z|"+searchParam;
            this.apiService.get(`/api/applicant/by-specification/${filter}`)
            .subscribe(res => (
                this.data.items = res,
                this._state.sprogress = false,
                this._state.strigger = false
            ));
        }
        return this.data.items;
    }

    public getByPendingRegistrationList(searchParam?: string): ApplicantDto[] {
        this._state.sprogress = this._state.strigger == true ? true : false;
        let filter = "0|"+searchParam;
        this.apiService.get(`/api/applicant/by-specification/${filter}`)
            .subscribe(res => (
                this.data.items = res,
                this._state.sprogress = false,
                this._state.strigger = false
            ));
        return this.data.items;
    }

    public getByPendingApprovalList(searchParam?: string): ApplicantDto[] {
        let filter = "1|"+searchParam;
        this.apiService.get(`/api/applicant/by-specification/${filter}`)
            .subscribe(res => (
                this.data.items = res
            ));
        return this.data.items;
    }

    public getBySimpleSearchList(searchParam?: string): ApplicantDto[] {
        let filter = "@|"+searchParam;
        this.apiService.get(`/api/applicant/by-specification/${filter}`)
            .subscribe(res => (
                this.data.items = res
            ));
        return this.data.items;
    }

    public getByAdvanceSearchList(searchParam?: string): ApplicantDto[] {
        let filter = "#|"+searchParam;
        this.apiService.get(`/api/applicant/by-specification/${filter}`)
            .subscribe(result => (
                this.data.items = result
            ));
        return this.data.items;
    }

    /**
     * Submit new id verification request for the applicant.
     * @param applicationid The application id request parameters.
     * @return verified information status.
     */
    public getByApplicantId(id: number): ApplicantDto {
        // let newid = "979CBFB2-000C-AFAC-8A44-3A079D916893"
        this.apiService.get(`/api/applicant/by-id/${id}`)
            .subscribe(result => (
                this.item = result
            ));
        return this.item;
    }

    /**
     * Submit new application id verification request for the applicant.
     * @param applicationid The application id request parameters.
     * @return verified information status.
     */
    // public getByApplicationId(applicationid: string): Observable<ApplicantDto> {   
    //     return this.apiService.get(`/api/appointment/by-application-id/${applicationid}`)
    //     .pipe(map(
    //         result => {
    //             this.item = result 
    //             return this.item;
    //         }
    //     ));
    // }
}