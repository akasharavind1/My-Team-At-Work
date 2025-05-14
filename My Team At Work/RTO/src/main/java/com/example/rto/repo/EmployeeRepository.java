package com.example.rto.repo;

import com.example.rto.entity.UserEntity;
import com.example.rto.entity.UserEntityAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
//jparepository <enitity name, datatype of primary key>
public interface EmployeeRepository extends JpaRepository<UserEntity,Integer>{

    boolean existsByMailID(String email);

    UserEntity findByMailID(String email);

    UserEntity findByEmployeeId(String empid);
//    @Query("SELECT ue FROM UserEntity ue left join UserEntityAttendance uea ON ue.id=:id")
//    UserEntity findByEmployeeId(Integer id);
    List<UserEntity> findAllByLastName(String id);
    List<UserEntity> findByLastName(String LastName);
    boolean existsByPassword(String password);

}
