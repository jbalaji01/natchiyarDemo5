package com.neemshade.natchiyar.demo.repository;

import com.neemshade.natchiyar.demo.domain.Diagnosis;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Diagnosis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiagnosisRepository extends JpaRepository<Diagnosis, Long> {

}
