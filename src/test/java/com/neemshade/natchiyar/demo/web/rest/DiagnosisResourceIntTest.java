package com.neemshade.natchiyar.demo.web.rest;

import com.neemshade.natchiyar.demo.NatchiyarDemo5App;

import com.neemshade.natchiyar.demo.domain.Diagnosis;
import com.neemshade.natchiyar.demo.repository.DiagnosisRepository;
import com.neemshade.natchiyar.demo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.neemshade.natchiyar.demo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DiagnosisResource REST controller.
 *
 * @see DiagnosisResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NatchiyarDemo5App.class)
public class DiagnosisResourceIntTest {

    private static final String DEFAULT_DIAGNOSIS_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DIAGNOSIS_NAME = "BBBBBBBBBB";

    @Autowired
    private DiagnosisRepository diagnosisRepository;


    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDiagnosisMockMvc;

    private Diagnosis diagnosis;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DiagnosisResource diagnosisResource = new DiagnosisResource(diagnosisRepository);
        this.restDiagnosisMockMvc = MockMvcBuilders.standaloneSetup(diagnosisResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Diagnosis createEntity(EntityManager em) {
        Diagnosis diagnosis = new Diagnosis()
            .diagnosisName(DEFAULT_DIAGNOSIS_NAME);
        return diagnosis;
    }

    @Before
    public void initTest() {
        diagnosis = createEntity(em);
    }

    @Test
    @Transactional
    public void createDiagnosis() throws Exception {
        int databaseSizeBeforeCreate = diagnosisRepository.findAll().size();

        // Create the Diagnosis
        restDiagnosisMockMvc.perform(post("/api/diagnoses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diagnosis)))
            .andExpect(status().isCreated());

        // Validate the Diagnosis in the database
        List<Diagnosis> diagnosisList = diagnosisRepository.findAll();
        assertThat(diagnosisList).hasSize(databaseSizeBeforeCreate + 1);
        Diagnosis testDiagnosis = diagnosisList.get(diagnosisList.size() - 1);
        assertThat(testDiagnosis.getDiagnosisName()).isEqualTo(DEFAULT_DIAGNOSIS_NAME);
    }

    @Test
    @Transactional
    public void createDiagnosisWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = diagnosisRepository.findAll().size();

        // Create the Diagnosis with an existing ID
        diagnosis.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDiagnosisMockMvc.perform(post("/api/diagnoses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diagnosis)))
            .andExpect(status().isBadRequest());

        // Validate the Diagnosis in the database
        List<Diagnosis> diagnosisList = diagnosisRepository.findAll();
        assertThat(diagnosisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDiagnoses() throws Exception {
        // Initialize the database
        diagnosisRepository.saveAndFlush(diagnosis);

        // Get all the diagnosisList
        restDiagnosisMockMvc.perform(get("/api/diagnoses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(diagnosis.getId().intValue())))
            .andExpect(jsonPath("$.[*].diagnosisName").value(hasItem(DEFAULT_DIAGNOSIS_NAME.toString())));
    }
    

    @Test
    @Transactional
    public void getDiagnosis() throws Exception {
        // Initialize the database
        diagnosisRepository.saveAndFlush(diagnosis);

        // Get the diagnosis
        restDiagnosisMockMvc.perform(get("/api/diagnoses/{id}", diagnosis.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(diagnosis.getId().intValue()))
            .andExpect(jsonPath("$.diagnosisName").value(DEFAULT_DIAGNOSIS_NAME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingDiagnosis() throws Exception {
        // Get the diagnosis
        restDiagnosisMockMvc.perform(get("/api/diagnoses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDiagnosis() throws Exception {
        // Initialize the database
        diagnosisRepository.saveAndFlush(diagnosis);

        int databaseSizeBeforeUpdate = diagnosisRepository.findAll().size();

        // Update the diagnosis
        Diagnosis updatedDiagnosis = diagnosisRepository.findById(diagnosis.getId()).get();
        // Disconnect from session so that the updates on updatedDiagnosis are not directly saved in db
        em.detach(updatedDiagnosis);
        updatedDiagnosis
            .diagnosisName(UPDATED_DIAGNOSIS_NAME);

        restDiagnosisMockMvc.perform(put("/api/diagnoses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDiagnosis)))
            .andExpect(status().isOk());

        // Validate the Diagnosis in the database
        List<Diagnosis> diagnosisList = diagnosisRepository.findAll();
        assertThat(diagnosisList).hasSize(databaseSizeBeforeUpdate);
        Diagnosis testDiagnosis = diagnosisList.get(diagnosisList.size() - 1);
        assertThat(testDiagnosis.getDiagnosisName()).isEqualTo(UPDATED_DIAGNOSIS_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDiagnosis() throws Exception {
        int databaseSizeBeforeUpdate = diagnosisRepository.findAll().size();

        // Create the Diagnosis

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restDiagnosisMockMvc.perform(put("/api/diagnoses")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(diagnosis)))
            .andExpect(status().isBadRequest());

        // Validate the Diagnosis in the database
        List<Diagnosis> diagnosisList = diagnosisRepository.findAll();
        assertThat(diagnosisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDiagnosis() throws Exception {
        // Initialize the database
        diagnosisRepository.saveAndFlush(diagnosis);

        int databaseSizeBeforeDelete = diagnosisRepository.findAll().size();

        // Get the diagnosis
        restDiagnosisMockMvc.perform(delete("/api/diagnoses/{id}", diagnosis.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Diagnosis> diagnosisList = diagnosisRepository.findAll();
        assertThat(diagnosisList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Diagnosis.class);
        Diagnosis diagnosis1 = new Diagnosis();
        diagnosis1.setId(1L);
        Diagnosis diagnosis2 = new Diagnosis();
        diagnosis2.setId(diagnosis1.getId());
        assertThat(diagnosis1).isEqualTo(diagnosis2);
        diagnosis2.setId(2L);
        assertThat(diagnosis1).isNotEqualTo(diagnosis2);
        diagnosis1.setId(null);
        assertThat(diagnosis1).isNotEqualTo(diagnosis2);
    }
}
