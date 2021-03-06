package com.neemshade.natchiyar.demo.repository;

import com.neemshade.natchiyar.demo.domain.Visit;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Visit entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisitRepository extends JpaRepository<Visit, Long> {

	List<Visit> findByPatientIdOrderByVisitDateDesc(Long patientId);
}
