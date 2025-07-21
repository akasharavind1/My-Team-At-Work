package com.example.rto.entity;
import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Table(name="EmployeeAttendance")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UserEntityAttendance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;
    @Column(name = "employee_id", nullable = false)
    private Integer employeeId;
    @Column(name = "date")
    private Date date;
    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "employeeId", updatable = false, insertable = false)
    private UserEntity employee;


}