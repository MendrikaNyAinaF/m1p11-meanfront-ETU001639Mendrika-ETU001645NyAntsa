import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubmitProps } from '../interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  /* from Props de la forme {key: inputprops} */ 
  @Input() inputs!: any;

  @Input() action!: SubmitProps;


  /** css class for each inputs */
  @Input() inputClass: string = "col-md-6 mb-4";

  /* composant formulaire */
  form !: FormGroup;

  loaderSubmit: boolean = false;

  keys() {
    return Object.keys(this.inputs);
  }

  validate() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loaderSubmit = true;
      this.action.submit(this.form.value)
        .then((res?: any) =>{
          this.alertService.alertSuccess(res?.message || "Le traitement a été effectué avec succès");
          this.loaderSubmit = false;
          this.submit.emit("success");
        })
        .catch((res?: any) =>{
          this.alertService.alertError(res?.message ||  "Une erreur s'est produite lors du traitement");
          this.loaderSubmit = false;
          this.submit.emit("error")
        } );
    }
  }

  /* émettre quand on fait un submit, si besoin est, de remplacer les valeurs par défaut par exemple */
  @Output() submit = new EventEmitter<string>();

  

  ngOnInit(): void {
    /* construit le formulaire */
    this.form = this.formBuilder.group({});
    
    Object.keys(this.inputs).forEach(key => {
      let value = this.inputs[key];
        this.form.addControl(key, this.buildControl(value));
    });
  }

  private buildControl(input: any) {
    return this.formBuilder.control({value: input.default ?? '', disabled: input.disabled}, input.validators ?? []);
  }
}
