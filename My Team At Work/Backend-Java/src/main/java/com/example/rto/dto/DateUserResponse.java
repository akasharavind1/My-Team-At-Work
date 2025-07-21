package com.example.rto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class DateUserResponse {
    private Date date;
    private Integer count;
    private Set<String> employeeName;
}
