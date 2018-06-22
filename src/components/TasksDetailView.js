import _ from "lodash";
import React, { Component } from "react";
import { Table, Col } from "reactstrap";

export default class ListView extends Component {
  render() {
    return (
      <Table borderless className="kaznet-table details">
        <tbody>
          <Col sm="15" md={{ size: 8, offset: 2 }}>
            <tr>
              <td className="kaznet-title-td">Description</td>
              <td>
                Lorem ipsum dolor amet woke knausgaard next level shabby chic
                tacos irony quinoa PBR&B. Letterpress pabst selfies VHS
                sustainable chambray synth fingerstache slow-carb meggings
                cronut bespoke hell of squid. Truffaut shoreditch portland
                fixie, 90's man braid chicharrones cred offal pok pok woke
                quinoa. Helvetica palo santo aesthetic, mustache shabby chic
                tattooed selvage four dollar toast whatever. XOXO copper mug
                vegan, venmo edison bulb viral lyft try-hard small batch yuccie
                cliche yr ugh YOLO snackwave. DIY jean shorts tilde asymmetrical
                lyft activated charcoal shabby chic church-key paleo pok pok
                letterpress keffiyeh. Thundercats chia bespoke, cronut taxidermy
                viral taiyaki subway tile wolf.
              </td>
            </tr>
            <tr>
              <td className="kaznet-title-td">Unit Reward Amount</td>
              <td>10,000 KES</td>
            </tr>
            <tr>
              <td className="kaznet-title-td">Form</td>
              <td>Prices > Cow Price</td>
            </tr>
            <br />
            <h1 className="kaznet-title-h1">Details</h1>
            <tr>
              <td className="kaznet-title-td">Active Dates</td>
              <td>June-18-2018</td>
            </tr>
            <tr>
              <td className="kaznet-title-td">Recurring</td>
              <td>Daily</td>
            </tr>
            <tr>
              <td className="kaznet-title-td">Client</td>
              <td>Planning Inc.</td>
            </tr>
          </Col>
        </tbody>
      </Table>
    );
  }
}
