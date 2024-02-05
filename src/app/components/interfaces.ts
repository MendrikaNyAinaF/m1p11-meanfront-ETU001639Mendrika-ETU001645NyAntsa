import { ValidatorFn } from "@angular/forms";
import { ThemePalette } from "@angular/material/core";

/* action for each row in the list/table component */
export interface RowAction {
     color: ThemePalette,
     icon: string,
     onclick: (row: any, index: number) => any,
     type?: "detail" | "edit" | "delete" | string
}

/* 
function with item any for argument and render an object any
functions to get each value of the columns on the list
*/
export type Getter = (item: any) => any;

/* Column interface for a table  */
export interface Column {
     name: string,
     selector: Getter, /* function to get the value of the column */
     class: string | "",
}

/** props for input component */
export interface InputProps {
     label: string;
     type?: string;
     default?: any;
     validators?: ValidatorFn | ValidatorFn[];
     onChange?: (value: any, obj: any) => any,
     /** only for images count */
     max?: number,
     disabled?: boolean
}

/** props for auto-complete component*/
export interface SelectProps extends InputProps{
     /**
      * if options is not an array then it must be the url for a get all API call,
      * if it's an array of object then the auto-completion will be on the client side
      */
     options: any[] ;
     /**
      * get value of the object for the selection
      */
     getValue: (item: any) => any;
     /**
      * get the text to represent the object
      */
     getText: (item: any) => string;
     /**
      * this will be used for auto-completion,
      * if it is used on the client side, then each object should have this key
      * if it is on used on API call then it is sent as a query parameter
      */
     searchKey?: string;
     /**
      * if set to false then the auto-completion will be on the client side
      */
     autoComplete?: boolean;
   }
