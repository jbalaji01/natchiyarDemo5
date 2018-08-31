package com.neemshade.natchiyar.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Diagnosis.
 */
@Entity
@Table(name = "diagnosis")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Diagnosis implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "diagnosis_name")
    private String diagnosisName;

    @ManyToMany(mappedBy = "diagnoses")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Patient> patients = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDiagnosisName() {
        return diagnosisName;
    }

    public Diagnosis diagnosisName(String diagnosisName) {
        this.diagnosisName = diagnosisName;
        return this;
    }

    public void setDiagnosisName(String diagnosisName) {
        this.diagnosisName = diagnosisName;
    }

    public Set<Patient> getPatients() {
        return patients;
    }

    public Diagnosis patients(Set<Patient> patients) {
        this.patients = patients;
        return this;
    }

    public Diagnosis addPatient(Patient patient) {
        this.patients.add(patient);
        patient.getDiagnoses().add(this);
        return this;
    }

    public Diagnosis removePatient(Patient patient) {
        this.patients.remove(patient);
        patient.getDiagnoses().remove(this);
        return this;
    }

    public void setPatients(Set<Patient> patients) {
        this.patients = patients;
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
        Diagnosis diagnosis = (Diagnosis) o;
        if (diagnosis.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diagnosis.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Diagnosis{" +
            "id=" + getId() +
            ", diagnosisName='" + getDiagnosisName() + "'" +
            "}";
    }
}
