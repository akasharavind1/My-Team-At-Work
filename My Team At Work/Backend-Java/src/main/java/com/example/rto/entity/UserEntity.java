package com.example.rto.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="employee")
@ToString
@Builder
public class UserEntity implements Serializable {
    public static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//it will increment the value
    private int id;
    @Column(name="firstName",nullable = false)
    private String firstName;
    @Column(name="lastName")
    private String lastName;
    @Column(name="mailID",nullable = false)
    private String mailID;
    @Column(name="employeeId",nullable = false,unique = true)
    private Integer employeeId;
    @Column(name="roles")
    private String roles;
    @Column(name="password")
    private String password;
}

