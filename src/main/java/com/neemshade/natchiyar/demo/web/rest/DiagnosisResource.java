package com.neemshade.natchiyar.demo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.neemshade.natchiyar.demo.domain.Diagnosis;
import com.neemshade.natchiyar.demo.domain.Patient;
import com.neemshade.natchiyar.demo.repository.DiagnosisRepository;
import com.neemshade.natchiyar.demo.repository.PatientRepository;
import com.neemshade.natchiyar.demo.web.rest.errors.BadRequestAlertException;
import com.neemshade.natchiyar.demo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing Diagnosis.
 */
@RestController
@RequestMapping("/api")
public class DiagnosisResource {

    private final Logger log = LoggerFactory.getLogger(DiagnosisResource.class);

    private static final String ENTITY_NAME = "diagnosis";

    private final DiagnosisRepository diagnosisRepository;
    private final PatientRepository patientRepository;

    public DiagnosisResource(DiagnosisRepository diagnosisRepository, PatientRepository patientRepository) {
        this.diagnosisRepository = diagnosisRepository;
        this.patientRepository = patientRepository;
    }

    /**
     * POST  /diagnoses : Create a new diagnosis.
     *
     * @param diagnosis the diagnosis to create
     * @return the ResponseEntity with status 201 (Created) and with body the new diagnosis, or with status 400 (Bad Request) if the diagnosis has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/diagnoses")
    @Timed
    public ResponseEntity<Diagnosis> createDiagnosis(@RequestBody Diagnosis diagnosis) throws URISyntaxException {
        log.debug("REST request to save Diagnosis : {}", diagnosis);
        if (diagnosis.getId() != null) {
            throw new BadRequestAlertException("A new diagnosis cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Diagnosis result = diagnosisRepository.save(diagnosis);
        return ResponseEntity.created(new URI("/api/diagnoses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /diagnoses : Updates an existing diagnosis.
     *
     * @param diagnosis the diagnosis to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated diagnosis,
     * or with status 400 (Bad Request) if the diagnosis is not valid,
     * or with status 500 (Internal Server Error) if the diagnosis couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/diagnoses")
    @Timed
    public ResponseEntity<Diagnosis> updateDiagnosis(@RequestBody Diagnosis diagnosis) throws URISyntaxException {
        log.debug("REST request to update Diagnosis : {}", diagnosis);
        if (diagnosis.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Diagnosis result = diagnosisRepository.save(diagnosis);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, diagnosis.getId().toString()))
            .body(result);
    }

    /**
     * GET  /diagnoses : get all the diagnoses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of diagnoses in body
     */
    @GetMapping("/diagnoses")
    @Timed
    public List<Diagnosis> getAllDiagnoses() {
        log.debug("REST request to get all Diagnoses");
        List<Diagnosis> diagnosisList = diagnosisRepository.findAll();
//        List<Diagnosis> diagnosisList = diagnosisRepository.findAllWithEagerRelationships();
        
//        fillPatients(diagnosisList);
        return diagnosisList;
    }

    private void fillPatients(List<Diagnosis> diagnosisList) {
    	
    	Map<Long, Diagnosis> diagnosisMap = new HashMap<Long, Diagnosis>();
    	for (Diagnosis diagnosis : diagnosisList) {
			diagnosisMap.put(diagnosis.getId(), diagnosis);
		}
    	
    	List<Patient> patients = patientRepository.findAllWithEagerRelationships();
    	for (Iterator iterator = patients.iterator(); iterator.hasNext();) {
			Patient patient = (Patient) iterator.next();
			for (Diagnosis diagnosisP : patient.getDiagnoses()) {
				Diagnosis diagnosisD = diagnosisMap.get(diagnosisP.getId());
				if(diagnosisD == null) continue;
				if(diagnosisD.getPatients() == null)
					diagnosisD.setPatients((Set<Patient>) new ArrayList<Patient>());
				diagnosisD.getPatients().add(patient);
			}
		}
	}

	/**
     * GET  /diagnoses/:id : get the "id" diagnosis.
     *
     * @param id the id of the diagnosis to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the diagnosis, or with status 404 (Not Found)
     */
    @GetMapping("/diagnoses/{id}")
    @Timed
    public ResponseEntity<Diagnosis> getDiagnosis(@PathVariable Long id) {
        log.debug("REST request to get Diagnosis : {}", id);
        Optional<Diagnosis> diagnosis = diagnosisRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(diagnosis);
    }

    /**
     * DELETE  /diagnoses/:id : delete the "id" diagnosis.
     *
     * @param id the id of the diagnosis to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/diagnoses/{id}")
    @Timed
    public ResponseEntity<Void> deleteDiagnosis(@PathVariable Long id) {
        log.debug("REST request to delete Diagnosis : {}", id);

        diagnosisRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
