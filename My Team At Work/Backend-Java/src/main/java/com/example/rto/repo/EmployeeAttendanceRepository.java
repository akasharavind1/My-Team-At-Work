package com.example.rto.repo;

import com.example.rto.entity.UserEntityAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Set;

public interface EmployeeAttendanceRepository extends JpaRepository<UserEntityAttendance,Integer> {
   List<UserEntityAttendance> findByEmployeeId(Integer empId);

   List<UserEntityAttendance> findByDate(Date date);

   Set<UserEntityAttendance> findByDateIn(List<Date> date);

   List<UserEntityAttendance> findByEmployeeIdAndDateIn(Integer id, List<Date> datelist );

   @Query(value = "select * from employeeattendance where employee_id = :empId and date_trunc('month',date)=date_trunc('month',CURRENT_DATE)", nativeQuery = true)
   List<UserEntityAttendance> findByEmployeeIdAndCurrentMonth(@Param("empId") Integer empId);

   @Query(value = "select * from employeeattendance where date between :startDate and :endDate",nativeQuery=true)
   List<UserEntityAttendance> findReportByDates(@Param("startDate") Date startDate,@Param("endDate") Date endDate);

}

