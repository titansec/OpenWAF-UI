import {PageClass} from "./page.class";

/**
 * An array of data with an associated page object used for paging
 */
export class PagedDataClass<T> {
    data = new Array<T>();
    page = new PageClass();
}