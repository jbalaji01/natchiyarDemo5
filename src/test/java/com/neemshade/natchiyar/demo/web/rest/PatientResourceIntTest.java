package com.neemshade.natchiyar.demo.web.rest;

import com.neemshade.natchiyar.demo.NatchiyarDemo5App;

import com.neemshade.natchiyar.demo.domain.Patient;
import com.neemshade.natchiyar.demo.repository.PatientRepository;
import com.neemshade.natchiyar.demo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;


import static com.neemshade.natchiyar.demo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PatientResource REST controller.
 *
 * @see PatientResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = NatchiyarDemo5App.class)
public class PatientResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final Integer DEFAULT_AGE = 1;
    private static final Integer UPDATED_AGE = 2;

    private static final Boolean DEFAULT_IS_NEW = false;
    private static final Boolean UPDATED_IS_NEW = true;

    private static final String DEFAULT_CHEIF_COMPLAINTS = "AAAAAAAAAA";
    private static final String UPDATED_CHEIF_COMPLAINTS = "BBBBBBBBBB";

    private static final String DEFAULT_ON_SET = "AAAAAAAAAA";
    private static final String UPDATED_ON_SET = "BBBBBBBBBB";

    private static final String DEFAULT_H_OPI = "AAAAAAAAAA";
    private static final String UPDATED_H_OPI = "BBBBBBBBBB";

    private static final String DEFAULT_FAMILY_HISTORY = "AAAAAAAAAA";
    private static final String UPDATED_FAMILY_HISTORY = "BBBBBBBBBB";

    private static final String DEFAULT_PRE_MORBID_PERSONALITY = "AAAAAAAAAA";
    private static final String UPDATED_PRE_MORBID_PERSONALITY = "BBBBBBBBBB";

    private static final String DEFAULT_SUMMARY = "AAAAAAAAAA";
    private static final String UPDATED_SUMMARY = "BBBBBBBBBB";

    @Autowired
    private PatientRepository patientRepository;
    @Mock
    private PatientRepository patientRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPatientMockMvc;

    private Patient patient;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PatientResource patientResource = new PatientResource(patientRepository);
        this.restPatientMockMvc = MockMvcBuilders.standaloneSetup(patientResource)
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
    public static Patient createEntity(EntityManager em) {
        Patient patient = new Patient()
            .name(DEFAULT_NAME)
            .phone(DEFAULT_PHONE)
            .age(DEFAULT_AGE)
            .isNew(DEFAULT_IS_NEW)
            .cheifComplaints(DEFAULT_CHEIF_COMPLAINTS)
            .onSet(DEFAULT_ON_SET)
            .hOPI(DEFAULT_H_OPI)
            .familyHistory(DEFAULT_FAMILY_HISTORY)
            .preMorbidPersonality(DEFAULT_PRE_MORBID_PERSONALITY)
            .summary(DEFAULT_SUMMARY);
        return patient;
    }

    @Before
    public void initTest() {
        patient = createEntity(em);
    }

    @Test
    @Transactional
    public void createPatient() throws Exception {
        int databaseSizeBeforeCreate = patientRepository.findAll().size();

        // Create the Patient
        restPatientMockMvc.perform(post("/api/patients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patient)))
            .andExpect(status().isCreated());

        // Validate the Patient in the database
        List<Patient> patientList = patientRepository.findAll();
        assertThat(patientList).hasSize(databaseSizeBeforeCreate + 1);
        Patient testPatient = patientList.get(patientList.size() - 1);
        assertThat(testPatient.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testPatient.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testPatient.getAge()).isEqualTo(DEFAULT_AGE);
        assertThat(testPatient.isIsNew()).isEqualTo(DEFAULT_IS_NEW);
        assertThat(testPatient.getCheifComplaints()).isEqualTo(DEFAULT_CHEIF_COMPLAINTS);
        assertThat(testPatient.getOnSet()).isEqualTo(DEFAULT_ON_SET);
        assertThat(testPatient.gethOPI()).isEqualTo(DEFAULT_H_OPI);
        assertThat(testPatient.getFamilyHistory()).isEqualTo(DEFAULT_FAMILY_HISTORY);
        assertThat(testPatient.getPreMorbidPersonality()).isEqualTo(DEFAULT_PRE_MORBID_PERSONALITY);
        assertThat(testPatient.getSummary()).isEqualTo(DEFAULT_SUMMARY);
    }

    @Test
    @Transactional
    public void createPatientWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = patientRepository.findAll().size();

        // Create the Patient with an existing ID
        patient.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPatientMockMvc.perform(post("/api/patients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patient)))
            .andExpect(status().isBadRequest());

        // Validate the Patient in the database
        List<Patient> patientList = patientRepository.findAll();
        assertThat(patientList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPatients() throws Exception {
        // Initialize the database
        patientRepository.saveAndFlush(patient);

        // Get all the patientList
        restPatientMockMvc.perform(get("/api/patients?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(patient.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].age").value(hasItem(DEFAULT_AGE)))
            .andExpect(jsonPath("$.[*].isNew").value(hasItem(DEFAULT_IS_NEW.booleanValue())))
            .andExpect(jsonPath("$.[*].cheifComplaints").value(hasItem(DEFAULT_CHEIF_COMPLAINTS.toString())))
            .andExpect(jsonPath("$.[*].onSet").value(hasItem(DEFAULT_ON_SET.toString())))
            .andExpect(jsonPath("$.[*].hOPI").value(hasItem(DEFAULT_H_OPI.toString())))
            .andExpect(jsonPath("$.[*].familyHistory").value(hasItem(DEFAULT_FAMILY_HISTORY.toString())))
            .andExpect(jsonPath("$.[*].preMorbidPersonality").value(hasItem(DEFAULT_PRE_MORBID_PERSONALITY.toString())))
            .andExpect(jsonPath("$.[*].summary").value(hasItem(DEFAULT_SUMMARY.toString())));
    }
    
    public void getAllPatientsWithEagerRelationshipsIsEnabled() throws Exception {
        PatientResource patientResource = new PatientResource(patientRepositoryMock);
        when(patientRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPatientMockMvc = MockMvcBuilders.standaloneSetup(patientResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPatientMockMvc.perform(get("/api/patients?eagerload=true"))
        .andExpect(status().isOk());

        verify(patientRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    public void getAllPatientsWithEagerRelationshipsIsNotEnabled() throws Exception {
        PatientResource patientResource = new PatientResource(patientRepositoryMock);
            when(patientRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPatientMockMvc = MockMvcBuilders.standaloneSetup(patientResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPatientMockMvc.perform(get("/api/patients?eagerload=true"))
        .andExpect(status().isOk());

            verify(patientRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPatient() throws Exception {
        // Initialize the database
        patientRepository.saveAndFlush(patient);

        // Get the patient
        restPatientMockMvc.perform(get("/api/patients/{id}", patient.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(patient.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.age").value(DEFAULT_AGE))
            .andExpect(jsonPath("$.isNew").value(DEFAULT_IS_NEW.booleanValue()))
            .andExpect(jsonPath("$.cheifComplaints").value(DEFAULT_CHEIF_COMPLAINTS.toString()))
            .andExpect(jsonPath("$.onSet").value(DEFAULT_ON_SET.toString()))
            .andExpect(jsonPath("$.hOPI").value(DEFAULT_H_OPI.toString()))
            .andExpect(jsonPath("$.familyHistory").value(DEFAULT_FAMILY_HISTORY.toString()))
            .andExpect(jsonPath("$.preMorbidPersonality").value(DEFAULT_PRE_MORBID_PERSONALITY.toString()))
            .andExpect(jsonPath("$.summary").value(DEFAULT_SUMMARY.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPatient() throws Exception {
        // Get the patient
        restPatientMockMvc.perform(get("/api/patients/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePatient() throws Exception {
        // Initialize the database
        patientRepository.saveAndFlush(patient);

        int databaseSizeBeforeUpdate = patientRepository.findAll().size();

        // Update the patient
        Patient updatedPatient = patientRepository.findById(patient.getId()).get();
        // Disconnect from session so that the updates on updatedPatient are not directly saved in db
        em.detach(updatedPatient);
        updatedPatient
            .name(UPDATED_NAME)
            .phone(UPDATED_PHONE)
            .age(UPDATED_AGE)
            .isNew(UPDATED_IS_NEW)
            .cheifComplaints(UPDATED_CHEIF_COMPLAINTS)
            .onSet(UPDATED_ON_SET)
            .hOPI(UPDATED_H_OPI)
            .familyHistory(UPDATED_FAMILY_HISTORY)
            .preMorbidPersonality(UPDATED_PRE_MORBID_PERSONALITY)
            .summary(UPDATED_SUMMARY);

        restPatientMockMvc.perform(put("/api/patients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPatient)))
            .andExpect(status().isOk());

        // Validate the Patient in the database
        List<Patient> patientList = patientRepository.findAll();
        assertThat(patientList).hasSize(databaseSizeBeforeUpdate);
        Patient testPatient = patientList.get(patientList.size() - 1);
        assertThat(testPatient.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testPatient.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testPatient.getAge()).isEqualTo(UPDATED_AGE);
        assertThat(testPatient.isIsNew()).isEqualTo(UPDATED_IS_NEW);
        assertThat(testPatient.getCheifComplaints()).isEqualTo(UPDATED_CHEIF_COMPLAINTS);
        assertThat(testPatient.getOnSet()).isEqualTo(UPDATED_ON_SET);
        assertThat(testPatient.gethOPI()).isEqualTo(UPDATED_H_OPI);
        assertThat(testPatient.getFamilyHistory()).isEqualTo(UPDATED_FAMILY_HISTORY);
        assertThat(testPatient.getPreMorbidPersonality()).isEqualTo(UPDATED_PRE_MORBID_PERSONALITY);
        assertThat(testPatient.getSummary()).isEqualTo(UPDATED_SUMMARY);
    }

    @Test
    @Transactional
    public void updateNonExistingPatient() throws Exception {
        int databaseSizeBeforeUpdate = patientRepository.findAll().size();

        // Create the Patient

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restPatientMockMvc.perform(put("/api/patients")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(patient)))
            .andExpect(status().isBadRequest());

        // Validate the Patient in the database
        List<Patient> patientList = patientRepository.findAll();
        assertThat(patientList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePatient() throws Exception {
        // Initialize the database
        patientRepository.saveAndFlush(patient);

        int databaseSizeBeforeDelete = patientRepository.findAll().size();

        // Get the patient
        restPatientMockMvc.perform(delete("/api/patients/{id}", patient.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Patient> patientList = patientRepository.findAll();
        assertThat(patientList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Patient.class);
        Patient patient1 = new Patient();
        patient1.setId(1L);
        Patient patient2 = new Patient();
        patient2.setId(patient1.getId());
        assertThat(patient1).isEqualTo(patient2);
        patient2.setId(2L);
        assertThat(patient1).isNotEqualTo(patient2);
        patient1.setId(null);
        assertThat(patient1).isNotEqualTo(patient2);
    }
}
