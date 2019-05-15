import React, { Component } from "react";
import breastImage from "../images/Breastfeeding-icon-med.svg.png";
import pregnancyImage from "../images/pregnancy-logo.png";

export default class RiskTable extends Component {
  render() {
    return (
      <div className="container">
        <h3>
          <img
            className="circle materialboxed"
            style={{ width: "40px", display: "inline" }}
            src={breastImage}
            alt="breastfeeding"
          />{" "}
          Lactation
        </h3>
        <table>
          <thead>
            <tr>
              <th>Risk</th>
              <th>Definition</th>
            </tr>
          </thead>

          <tbody>
            <tr className="green lighten-2">
              <td>L1</td>
              <td>Safe. Compatible. Not risky for breastfeeding or infant.</td>
            </tr>
            <tr className="yellow lighten-2">
              <td>L2</td>
              <td>
                Moderately safe. Probably compatible. Mild risk possible. Follow
                up recommended.
              </td>
            </tr>
            <tr className="orange lighten-2">
              <td>L3</td>
              <td>
                Poorly safe. Use safer alternative. Use only if the potential
                benefit justifies the potential risk.
              </td>
            </tr>
            <tr className="red lighten-2">
              <td>L4</td>
              <td>
                Very unsafe. Contraindicated. Use of an alternative or cessation
                of breastfeeding.
              </td>
            </tr>
          </tbody>
        </table>

        <h3>
          <img
            className="circle materialboxed"
            style={{ width: "40px", display: "inline" }}
            src={pregnancyImage}
            alt="pregnancy"
          />{" "}
          Pregnancy
        </h3>
        <table>
          <thead>
            <tr>
              <th>Risk</th>
              <th>Definition</th>
            </tr>
          </thead>

          <tbody>
            <tr className="green lighten-2">
              <td>A</td>
              <td>
                Drugs which have been taken by a large number of pregnant women
                and women of childbearing age without an increase in the
                frequency of malformations or other direct or indirect harmful
                effects on the fetus having been observed.{" "}
              </td>
            </tr>
            <tr className="lime lighten-2">
              <td>B1</td>
              <td>
                Drugs which have been taken by only a limited number of pregnant
                women and women of childbearing age, without an increase in the
                frequency of malformation or other direct or indirect harmful
                effects on the human fetus having been observed. Studies in
                animals have not shown evidence of an increased occurrence of
                fetal damage.{" "}
              </td>
            </tr>
            <tr className="yellow lighten-2">
              <td>B2</td>
              <td>
                Drugs which have been taken by only a limited number of pregnant
                women and women of childbearing age, without an increase in the
                frequency of malformation or other direct or indirect harmful
                effects on the human fetus having been observed. Studies in
                animals are inadequate or may be lacking, but available data
                show no evidence of an increased occurrence of fetal damage.{" "}
              </td>
            </tr>
            <tr className="orange lighten-2">
              <td>B3</td>
              <td>
                Drugs which have been taken by only a limited number of pregnant
                women and women of childbearing age, without an increase in the
                frequency of malformation or other direct or indirect harmful
                effects on the human fetus having been observed. Studies in
                animals have shown evidence of an increased occurrence of fetal
                damage, the significance of which is considered uncertain in
                humans.{" "}
              </td>
            </tr>
            <tr className="red lighten-2">
              <td>C</td>
              <td>
                Drugs which, owing to their pharmaceutical effects, have caused
                or may be suspected of causing, harmful effects on the human
                fetus or neonate without causing malformations. These effects
                may be reversible.{" "}
              </td>
            </tr>
            <tr className="red darken-2">
              <td>D</td>
              <td>
                Drugs which have caused, are suspected to have caused or may be
                expected to cause, an increased incidence of human fetal
                malformations or irreversible damage. These drugs may also have
                adverse pharmacological effects.{" "}
              </td>
            </tr>
            <tr className="grey darken-2">
              <td>X</td>
              <td>
                Drugs which have such a high risk of causing permanent damage to
                the fetus that they should not be used in pregnancy or when
                there is a possibility of pregnancy.{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
