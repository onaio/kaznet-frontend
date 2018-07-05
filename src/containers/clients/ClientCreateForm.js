import React, { Component } from "react";

import * as clientActions from "../../store/clients/actions";
import ClientForm from "./ClientForm";
import FormView from "../../components/FormView";

export default class ClientCreateForm extends Component {
  render() {
    const action = clientActions.createClient;
    const initialData = {
      name: ""
    };
    return (
      <FormView
        form={<ClientForm action={action} initialData={initialData} />}
      />
    );
  }
}
