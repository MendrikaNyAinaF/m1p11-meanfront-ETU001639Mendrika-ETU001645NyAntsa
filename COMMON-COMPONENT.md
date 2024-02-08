# Documentation du composant CRUD généralisé
## Petite présentation
Composant sur une seule page pour faire les CRUD (peut marcher aussi si on veut rediriger quand on clique sur une ligne de la liste)

## Paramètres
- pageProps: PageCrudProps = { create: false, update: false, delete: false, list: false, filter: false, paginate: false };
- fields: any; /* de la forme: {key: PageCrudFieldProps} */
- fieldsFilter: any; /* de la forme: {key: PageCrudFieldProps} */ //comme fields mais pour le filtre
- crudService!: CrudService;
- onRowClick?: (row: any) => void;
(à voir dans le Composant PageCrudComponent pour les détails)

## Cas d'utilisation
1. Il faut créer un service qui étend le service CrudService et override la méthode findAll dans le but d'arranger le find All pour le mongo query (les paramètres du find all par défaut sont {search: {key: value}, page{size, number}})

2. Créer le composant qui sera la page du Crud et définir les propriétés

## Exemple
Un exemple qu'on peut retrouver dans views/page-service-crud avec le service services/service/service-crud


# Documentation du formulaire qui va tout seul
Ce composant emet un string success si le traitement du submit a bien été effectué, soit un error, grace à l'event "submit"

## Paramètre
- inputs
- action
- inputClass (pour chaque inputs)
(à voir dans le Composant FormComponent pour les détails)


# Documentation de la liste non paginé et paginé
Ce composant emet un event currentPageChange qui emet un number pour le changement de la page actuel

## Paramètre
- data
- columns
- editable
- deletable
- updateFormProps
- deleteAction
- onRowClick
[paginé]
- currentPage
- rowsPerPage(10 par defaut)
- length: nombre total d'élément
(à voir dans TableComponent et TablePaginateComponent et TableCommon)

