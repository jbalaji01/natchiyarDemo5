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
 * A Patient.
 */
@Entity
@Table(name = "patient")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone")
    private String phone;

    @Column(name = "age")
    private Integer age;

    @Column(name = "is_new")
    private Boolean isNew;

    @Column(name = "cheif_complaints")
    private String cheifComplaints;

    @Column(name = "on_set")
    private String onSet;

    @Column(name = "h_opi")
    private String hOPI;

    @Column(name = "family_history")
    private String familyHistory;

    @Column(name = "pre_morbid_personality")
    private String preMorbidPersonality;

    @Column(name = "summary")
    private String summary;

    @OneToMany(mappedBy = "patient")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Visit> visits = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "patient_diagnosis",
               joinColumns = @JoinColumn(name = "patients_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "diagnoses_id", referencedColumnName = "id"))
    private Set<Diagnosis> diagnoses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Patient name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public Patient phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getAge() {
        return age;
    }

    public Patient age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean isIsNew() {
        return isNew;
    }

    public Patient isNew(Boolean isNew) {
        this.isNew = isNew;
        return this;
    }

    public void setIsNew(Boolean isNew) {
        this.isNew = isNew;
    }

    public String getCheifComplaints() {
        return cheifComplaints;
    }

    public Patient cheifComplaints(String cheifComplaints) {
        this.cheifComplaints = cheifComplaints;
        return this;
    }

    public void setCheifComplaints(String cheifComplaints) {
        this.cheifComplaints = cheifComplaints;
    }

    public String getOnSet() {
        return onSet;
    }

    public Patient onSet(String onSet) {
        this.onSet = onSet;
        return this;
    }

    public void setOnSet(String onSet) {
        this.onSet = onSet;
    }

    public String gethOPI() {
        return hOPI;
    }

    public Patient hOPI(String hOPI) {
        this.hOPI = hOPI;
        return this;
    }

    public void sethOPI(String hOPI) {
        this.hOPI = hOPI;
    }

    public String getFamilyHistory() {
        return familyHistory;
    }

    public Patient familyHistory(String familyHistory) {
        this.familyHistory = familyHistory;
        return this;
    }

    public void setFamilyHistory(String familyHistory) {
        this.familyHistory = familyHistory;
    }

    public String getPreMorbidPersonality() {
        return preMorbidPersonality;
    }

    public Patient preMorbidPersonality(String preMorbidPersonality) {
        this.preMorbidPersonality = preMorbidPersonality;
        return this;
    }

    public void setPreMorbidPersonality(String preMorbidPersonality) {
        this.preMorbidPersonality = preMorbidPersonality;
    }

    public String getSummary() {
        return summary;
    }

    public Patient summary(String summary) {
        this.summary = summary;
        return this;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Set<Visit> getVisits() {
        return visits;
    }

    public Patient visits(Set<Visit> visits) {
        this.visits = visits;
        return this;
    }

    public Patient addVisit(Visit visit) {
        this.visits.add(visit);
        visit.setPatient(this);
        return this;
    }

    public Patient removeVisit(Visit visit) {
        this.visits.remove(visit);
        visit.setPatient(null);
        return this;
    }

    public void setVisits(Set<Visit> visits) {
        this.visits = visits;
    }

    public Set<Diagnosis> getDiagnoses() {
        return diagnoses;
    }

    public Patient diagnoses(Set<Diagnosis> diagnoses) {
        this.diagnoses = diagnoses;
        return this;
    }

    public Patient addDiagnosis(Diagnosis diagnosis) {
        this.diagnoses.add(diagnosis);
        diagnosis.getPatients().add(this);
        return this;
    }

    public Patient removeDiagnosis(Diagnosis diagnosis) {
        this.diagnoses.remove(diagnosis);
        diagnosis.getPatients().remove(this);
        return this;
    }

    public void setDiagnoses(Set<Diagnosis> diagnoses) {
        this.diagnoses = diagnoses;
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
        Patient patient = (Patient) o;
        if (patient.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), patient.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", phone='" + getPhone() + "'" +
            ", age=" + getAge() +
            ", isNew='" + isIsNew() + "'" +
            ", cheifComplaints='" + getCheifComplaints() + "'" +
            ", onSet='" + getOnSet() + "'" +
            ", hOPI='" + gethOPI() + "'" +
            ", familyHistory='" + getFamilyHistory() + "'" +
            ", preMorbidPersonality='" + getPreMorbidPersonality() + "'" +
            ", summary='" + getSummary() + "'" +
            "}";
    }
}
