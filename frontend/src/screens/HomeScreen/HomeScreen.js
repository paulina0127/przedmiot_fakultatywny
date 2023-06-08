import { BsPerson } from "react-icons/bs";
import { CiMedicalCross } from "react-icons/ci";
import { IoSchoolOutline } from "react-icons/io5";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

import classNames from "classnames";

import { DoctorInfo } from "../../components/general";
import { doctors } from "./doctors";
import styles from "./HomeScreen.module.css";

const HomeScreen = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <section
        className={classNames("hs-section", styles.sectionGradient)}
        id="about"
      >
        <div className="container">
          <div className="row">
            <article className="col-lg-8 col-md-12">
              <h1 className={styles.sectionH1}>O przychodni</h1>
              <p>
                Przychodnia Healthy Care to nowoczesny i profesjonalny ośrodek
                medyczny, który oferuje kompleksowe usługi z zakresu opieki
                zdrowotnej. W przychodni pracują wysoko wykwalifikowani lekarze
                różnych specjalizacji. Przychodnia umożliwia rezerwację wizyt
                online. Healthy Care stawia na indywidualne podejście do
                pacjenta oraz wysoką jakość świadczonych usług, co przekłada się
                na zadowolenie i zaufanie pacjentów.
              </p>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <BsPerson className={styles.icon} />
                  <h3>5</h3>
                  <h4>Lekarzy</h4>
                </div>
                <div className={styles.stat}>
                  <IoSchoolOutline className={styles.icon} />
                  <h3>4</h3>
                  <h4>Specjalizacje</h4>
                </div>
                <div className={styles.stat}>
                  <CiMedicalCross className={styles.icon} />
                  <h3>10</h3>
                  <h4>Lat doświadczenia</h4>
                </div>
              </div>
            </article>
            <article className={classNames("col", styles.bgImg)}>
              <img
                src={require("../../images/hs-img.png")}
                className={styles.hsImg}
                alt=""
              />
            </article>
          </div>
        </div>
      </section>
      <section className="hs-section bg-light-blue" id="internists">
        <div className="container">
          <div className="row">
            <h1 className={styles.sectionH1}>Lekarze interniści</h1>
          </div>
          <div className="row gy-5 ">
            <div className="col-lg-6 col-12">
              <DoctorInfo doctor={doctors[0]} />
              <p className={styles.doctorP}>
                Internista specjalizujący się w chorobach układu
                sercowo-naczyniowego. Jest znany z profesjonalnego podejścia do
                pacjentów i umiejętności wyjaśniania skomplikowanych kwestii
                medycznych w przystępny sposób.
              </p>
            </div>
            <div className="col-lg-6 col-12">
              <DoctorInfo doctor={doctors[1]} />
              <p className={styles.doctorP}>
                Internistka z wieloletnim doświadczeniem w opiece nad pacjentami
                z cukrzycą i chorobami metabolicznymi. Jest znana ze swojego
                entuzjastycznego podejścia do pacjentów i stara się zawsze
                znaleźć najlepsze rozwiązanie dla ich problemów zdrowotnych.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="hs-section bg-white" id="specialists">
        <div className="container gy-lg-5">
          <div className="row">
            <h1 className={styles.sectionH1}>Lekarze specjaliści</h1>
          </div>
          <div className="row gy-5">
            <div className="col-lg-4 col-12">
              <DoctorInfo doctor={doctors[2]} />
              <p className={styles.doctorP}>
                Gastrolog, który specjalizuje się w leczeniu chorób układu
                pokarmowego, takich jak choroba refluksowa i choroba wrzodowa.
                Jest znany z dokładności i skrupulatności w wykonywaniu
                diagnostyki oraz skutecznego leczenia pacjentów.
              </p>
            </div>
            <div className="col-lg-4 col-12">
              <DoctorInfo doctor={doctors[3]} />
              <p className={styles.doctorP}>
                Okulistka, która specjalizuje się w leczeniu chorób oczu, takich
                jak zaćma i jaskra. Jest znana z precyzji w wykonywaniu badań
                okulistycznych oraz empatycznego podejścia do swoich pacjentów.
              </p>
            </div>
            <div className="col-lg-4 col-12">
              <DoctorInfo doctor={doctors[4]} />
              <p className={styles.doctorP}>
                Pulmonolog, który specjalizuje się w leczeniu chorób układu
                oddechowego, takich jak astma i choroba płuc. Jest znany z
                dokładności i skrupulatności w wykonywaniu diagnostyki oraz
                skutecznego leczenia pacjentów.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(HomeScreen);
