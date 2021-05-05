import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";

export interface CanDeactivateComponent{
   canDeactivate():boolean;
}

@Injectable()
export class FormCanDeactivateGuard implements CanDeactivate<CanDeactivateComponent> {

  canDeactivate(component: CanDeactivateComponent) {
    if (component.canDeactivate()) {
      return true;
    }
    return window.confirm('Deseja realmente abandonar o preenchimento do formulário?');
  }

}
