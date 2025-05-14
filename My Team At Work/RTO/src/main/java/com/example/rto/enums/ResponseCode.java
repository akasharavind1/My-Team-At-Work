package com.example.rto.enums;

public enum ResponseCode {
    USER_NOT_FOUND("User not found"),
    INVALID_DATA("Invalid Data"),
    EMPLOYEE_UPDATED_SUCCESSFULLY("Employee Updated Successfully"),
    EMPLOYEE_NOT_FOUND("Employee Not Found"),
    MAIL_ID_ALREADY_EXISTS("Mail_ID already exits");
    private String value;

    ResponseCode(String value) {
        this.value = value;
    }


}
