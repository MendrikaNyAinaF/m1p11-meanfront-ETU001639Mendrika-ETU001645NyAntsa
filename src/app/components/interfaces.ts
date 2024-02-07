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

export type DeleteAction= (id:any) => any;

/* Column interface for a table  */
export interface Column {
     name: string,
     selector: Getter, /* function to get the value of the column */
     class: string | "",
     type?: "text" | "img"
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
export interface SelectProps extends InputProps {
     /**
      * if options is not an array then it must be the url for a get all API call,
      * if it's an array of object then the auto-completion will be on the client side
      */
     options: any[];
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

export interface SubmitProps {
     // 'label' is a required property of type string
     label: string;

     // 'color' is an optional property that can be of type ThemePalette (presumably defined elsewhere)
     // The question mark indicates that this property is optional
     color?: string;

     // 'disabled' is an optional boolean property, indicating whether the submit button should be disabled
     disabled?: boolean;

     // 'submit' is an optional function property that takes an object of any type as a parameter and returns any type
     // The component use this interface may have a submit function that can be passed as a prop
     submit: (obj: any) => any;
}

export interface CrudProps {
     present: boolean;
     title: string;
     action?: (obj: any, id?:any) => any;
}

export interface CrudFilterProps {
     present: boolean;
     title: string;
     inputs:any;
}

export interface CrudListProps extends CrudProps{
     withPagination: boolean;
     columns: Column[];
     filterProps?: InputProps | SelectProps;
}


export interface CrudField {
     name: string; //ce sera le key utilisé pour les formulaire et pour le tableau 
     inputProps: any;
     inCreate?: boolean;
     inUpdate?: boolean;
     actionSelect?: (obj?: any) => any;

}

export interface FormProps{
     inputs:any;
     action: SubmitProps;
     title?: string;
}
export function isForm(value: any) {
     let val;
     return Object.keys(value).length > 0 && ((val = value[Object.keys(value)[0]]) && typeof val === "object");
}


