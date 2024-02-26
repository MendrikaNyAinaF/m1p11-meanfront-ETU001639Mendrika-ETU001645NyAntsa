import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SubmitProps } from '../interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) { }

  /* from Props de la forme {key: inputprops} */
  @Input() inputs!: any;

  @Input() action!: SubmitProps;

  /** css class for each inputs */
  @Input() inputClass: string = "w-100 fs-16";

  /** si oui ou non mettre le sweetAlert à la fin du traitement */
  @Input() withSweetAlert: boolean = true;

  /* composant formulaire */
  form !: FormGroup;

  /* loader pour le submit */
  loaderSubmit: boolean = false;

  keys() {
    return Object.keys(this.inputs);
  }

  /* soumettre le formulaire */
  validate() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.loaderSubmit = true;
      this.action.submit(this.form.value)
        .then((res?: any) => {
          if (this.withSweetAlert)
            this.alertService.alertSuccess(res?.message || "Le traitement a été effectué avec succès");
          this.loaderSubmit = false;
          this.submit.emit("success");
        })
        .catch((res?: any) => {
          if (this.withSweetAlert)
          this.alertService.alertError(res?.error?.message||res?.message || "Une erreur s'est produite lors du traitement");
          this.loaderSubmit = false;
          this.submit.emit("error")
        });
    }
  }

  /* émettre quand on fait un submit, si besoin est, de remplacer les valeurs par défaut par exemple */
  @Output() submit = new EventEmitter<string>();



  ngOnInit(): void {
    /* construire la classe du bouton */
    if(this.action.class==undefined || this.action.class==null || this.action.class==""){
      this.action.class="me-8 mb-8";
    }
    /* construit le formulaire */
    this.form = new FormGroup({});

    Object.keys(this.inputs).forEach(key => {
      let value = this.inputs[key];
      this.form.addControl(key, this.buildControl(value));
      if(this.inputs[key].class==undefined || this.inputs[key].class==null || this.inputs[key].class==""){
        this.inputs[key].class = this.inputClass;
      }
    });
  }

  private buildControl(input: any) {
    return this.formBuilder.control({ value: input.default ?? '', disabled: input.disabled }, input.validators ?? []);
  }
}
