import { ValidatorFn } from "@angular/forms";


/* 
function with item any for argument and render an object any
functions to get each value of the columns on the list
*/
export type Getter = (item: any) => any;

/* l'action à faire pour le formulaire de suppression  */
export type DeleteAction= (id:any) => any;

/* Column interface for a table  */
export interface Column {
     name: string,
     selector: Getter, /* function to get the value of the column */
     class?: string | "",
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
     disabled?: boolean,
     class?: string,
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

/*propriété du bouton submit dans un formulaire*/
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

/*propriété d'une action CRUD */
export interface CrudProps {
     present: boolean; //si l'action est présente ou non
     title: string; //le titre de l'action dans le formulaire ou liste
     action?: (obj: any, id?:any) => any; //la fonction à exécuter pour le formulaire ou la liste
}
/*propriété d'un filtre CRUD */
export interface CrudFilterProps {
     present: boolean; //si le filtre est présent ou non
     title: string; //le titre du filtre
     inputs:any; //les inputs du filtre (pour le formulaire)
}

/*propriété d'une liste CRUD */
export interface CrudListProps extends CrudProps{
     withPagination: boolean; //si la liste est paginée ou non
     columns: Column[]; //les colonnes de la liste
     onRowClick?: (row: any) => any;     //la fonction à exécuter lorsqu'on clique sur une ligne
}

/*propriété d'un champ CRUD */
export interface CrudField {
     name: string; //ce sera le key utilisé pour les formulaire et pour le tableau 
     inputProps: any; //les propriétés de l'input en cas de formulaire
     inCreate?: boolean; //si le champ est present/visible dans le formulaire de création
     inUpdate?: boolean; //si le champ est présent/visible dans le formulaire de modification
     actionSelect?: (obj?: any) => any;

}
/*propriété d'un formulaire */
export interface FormProps{
     inputs:any; //les inputs du formulaire
     action: SubmitProps; //le bouton submit du formulaire
     title?: string; //le titre du formulaire
}
export function isForm(value: any) {
     let val;
     return Object.keys(value).length > 0 && ((val = value[Object.keys(value)[0]]) && typeof val === "object");
}


