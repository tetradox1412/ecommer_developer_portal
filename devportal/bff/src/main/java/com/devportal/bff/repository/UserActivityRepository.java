package com.devportal.bff.repository;

import com.devportal.bff.model.UserActivityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserActivityRepository extends JpaRepository<UserActivityEntity, String> {
    List<UserActivityEntity> findByUserIdOrderByTimestampDesc(String userId);
}
