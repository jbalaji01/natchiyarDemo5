package com.neemshade.natchiyar.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Visit.
 */
@Entity
@Table(name = "visit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "visit_date")
    private Instant visitDate;

    @Column(name = "m_se")
    private String mSE;

    @Column(name = "physical_examination")
    private String physicalExamination;

    @Column(name = "treatment")
    private String treatment;

    @ManyToOne
    @JsonIgnoreProperties("visits")
    private Patient patient;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getVisitDate() {
        return visitDate;
    }

    public Visit visitDate(Instant visitDate) {
        this.visitDate = visitDate;
        return this;
    }

    public void setVisitDate(Instant visitDate) {
        this.visitDate = visitDate;
    }

    public String getmSE() {
        return mSE;
    }

    public Visit mSE(String mSE) {
        this.mSE = mSE;
        return this;
    }

    public void setmSE(String mSE) {
        this.mSE = mSE;
    }

    public String getPhysicalExamination() {
        return physicalExamination;
    }

    public Visit physicalExamination(String physicalExamination) {
        this.physicalExamination = physicalExamination;
        return this;
    }

    public void setPhysicalExamination(String physicalExamination) {
        this.physicalExamination = physicalExamination;
    }

    public String getTreatment() {
        return treatment;
    }

    public Visit treatment(String treatment) {
        this.treatment = treatment;
        return this;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public Patient getPatient() {
        return patient;
    }

    public Visit patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Visit visit = (Visit) o;
        if (visit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Visit{" +
            "id=" + getId() +
            ", visitDate='" + getVisitDate() + "'" +
            ", mSE='" + getmSE() + "'" +
            ", physicalExamination='" + getPhysicalExamination() + "'" +
            ", treatment='" + getTreatment() + "'" +
            "}";
    }
}
