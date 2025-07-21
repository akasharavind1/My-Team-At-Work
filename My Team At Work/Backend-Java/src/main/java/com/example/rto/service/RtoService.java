package com.example.rto.service;

import com.example.rto.dto.DateUserResponse;
import com.example.rto.dto.EmployeeDetailsDTO;
import com.example.rto.dto.UserDTO;
import com.example.rto.dto.adminDetailsDTO;
import com.example.rto.entity.UserEntity;
import com.example.rto.entity.UserEntityAttendance;
import com.example.rto.enums.ResponseCode;
import com.example.rto.exception.InternalServerErrorException;
import com.example.rto.exception.NotFoundException;
import com.example.rto.repo.EmployeeAttendanceRepository;
import com.example.rto.repo.EmployeeRepository;
import java.text.SimpleDateFormat;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.*;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
public class RtoService {

    private final ModelMapper modelMapper;
    private EmployeeRepository employeeRepository;
    private final EmployeeAttendanceRepository employeeAttendanceRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(RtoService.class);

    @Autowired
    public RtoService(ModelMapper modelMapper, EmployeeRepository employeeRepository,
        EmployeeAttendanceRepository employeeAttendanceRepository) {
        this.modelMapper = modelMapper;
        this.employeeRepository = employeeRepository;
        this.employeeAttendanceRepository = employeeAttendanceRepository;

    }

    public Map<String, List<Date>> demo() throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = dateFormat.parse("2023-08-01");
        Date endDate = dateFormat.parse("2023-08-17");
        Map<String, List<Date>> groupedByFirstName = new HashMap<>();
        List<UserEntityAttendance> demo = employeeAttendanceRepository.findReportByDates(startDate, endDate);
        Map<Date, List<UserEntityAttendance>> groupedByDate = demo.stream().collect(Collectors.groupingBy(UserEntityAttendance::getDate));
        for (Map.Entry<Date, List<UserEntityAttendance>> entry : groupedByDate.entrySet()) {
            Date date = entry.getKey();
            List<UserEntityAttendance> attendanceList = entry.getValue();
            for (UserEntityAttendance userEntityAttendance : attendanceList) {
                String firstName = userEntityAttendance.getEmployee().getFirstName();
                if (!groupedByFirstName.containsKey(firstName)) {
                    groupedByFirstName.put(firstName, new ArrayList<>());
                }
                groupedByFirstName.get(firstName).add(date);
            }
        }
        return groupedByFirstName;
    }

    public ResponseEntity<?> login(UserEntity loginInfo) {
        try {
            UserEntity user = (employeeRepository.findByMailID(loginInfo.getMailID()));
            if (user == null) {
                return ResponseEntity.notFound().build();
            } else if (!user.getPassword().equals(loginInfo.getPassword())) {
                return ResponseEntity.ok("Password Mismatch");
            } else {
                UserDTO userdto = modelMapper.map(user, UserDTO.class);
                userdto.setMessage("User retrieved successfully");
                userdto.setEmployeeId(user.getEmployeeId());
                return ResponseEntity.ok(userdto);
            }

        } catch (Exception e) {
            throw new InternalServerErrorException("Getting error while authenticating the user credentials");
        }
    }

    public String signup(UserEntity newEmployeeInfo) {
        try {
            employeeRepository.save(newEmployeeInfo);
            return "EMPLOYEE REGISTERED SUCCESSFULLY";
        } catch (Exception e) {
            throw new InternalServerErrorException("Getting error while authenticating the user credentials");
        }
    }

    public UserDTO getEmpInfo(Integer id) {
        try {
            UserEntity empInfo = employeeRepository.findById(id).orElseThrow(() -> new NotFoundException(ResponseCode.EMPLOYEE_NOT_FOUND.name()));
            UserDTO map = modelMapper.map(empInfo, UserDTO.class);
            map.setMessage("Employee Retrieved Successfully");
            return map;
        } catch (Exception e) {
            LOGGER.error("Error while fetching the specific employee info");
            throw new InternalServerErrorException("Error while getting the specific employee info ");
        }
    }

    public List<String> demo(Integer empId) {
        try {
            String lastName = "1";
            List<UserEntity> demo = employeeRepository.findAllByLastName(lastName);
            List<UserEntity> demo2 = employeeRepository.findByLastName(lastName);
            return demo2.stream().map(UserEntity::getFirstName).collect(toList());
        } catch (Exception e) {
            LOGGER.error("Error while trying this demo endpoint");
            throw new InternalServerErrorException("Error while trying this demo endpoint");
        }
    }

    public String updateService(Integer id, UserEntity user) {

        try {
            UserEntity existingUser = employeeRepository.findById(id).orElseThrow(() -> new NotFoundException(ResponseCode.EMPLOYEE_NOT_FOUND.name()));
            existingUser.setFirstName(user.getFirstName());
            existingUser.setLastName(user.getLastName());
            existingUser.setRoles(user.getRoles());
            existingUser.setMailID(user.getMailID());
            employeeRepository.save(existingUser);
            return null;
        } catch (Exception e) {
            LOGGER.error("Error while updating the employee details");
            throw new InternalServerErrorException("Error while updating a record");
        }
    }

    public List<EmployeeDetailsDTO> employeeDetails() {
        try {
            List<UserEntity> user = employeeRepository.findAll();
            List<EmployeeDetailsDTO> empdetails = new ArrayList<>();
            for (UserEntity userfor : user) {
                EmployeeDetailsDTO map = modelMapper.map(userfor, EmployeeDetailsDTO.class);
                empdetails.add(map);
            }
            return empdetails;
        } catch (Exception e) {
            LOGGER.error("Error while fetching the employee details");
            throw new InternalServerErrorException("Error while fectching the employee details");
        }
    }

    public ResponseEntity addDates(Integer id, List<Date> datelist) throws ParseException {
        try {
            ArrayList<UserEntityAttendance> employeeAttendance = new ArrayList<>();
            List<UserEntityAttendance> exist = employeeAttendanceRepository.findByEmployeeIdAndDateIn(id, datelist);
            datelist.removeIf(c1 -> exist.stream().anyMatch(c2 -> c1.equals(c2.getDate()))
            );
            for (Date date : datelist) {
                UserEntityAttendance attendance = UserEntityAttendance.builder().employeeId(id).date(date).build();
                employeeAttendance.add(attendance);
            }
            employeeAttendanceRepository.saveAll(employeeAttendance);
            return null;
        } catch (Exception e) {
            LOGGER.error("Error while adding the dates for the employee");
            throw new InternalServerErrorException("Error while adding the dates for the employee");
        }
    }

//    public ResponseEntity updateDates(Integer id, List<Date> updatedDateList) {
//        try {
//            Date nullDate = null;
//            List<UserEntityAttendance> empOld = employeeAttendanceRepository.findByEmployeeId(id);
//            empOld.stream().map(eo -> nulldate(eo.getId())).collect(toList());
//            ArrayList<UserEntityAttendance> employeeAttendance = new ArrayList<>();
//            List<UserEntityAttendance> exist = employeeAttendanceRepository.findByEmployeeIdAndDateIn(id, updatedDateList);
//            updatedDateList.removeIf(c1 -> exist.stream().anyMatch(c2 -> c1.equals(c2.getDate()))
//            );
//            for (Date date : updatedDateList) {
//                UserEntityAttendance attendance = UserEntityAttendance.builder().employeeId(id).date(date).build();
//                employeeAttendance.add(attendance);
//            }
//            employeeAttendanceRepository.saveAll(employeeAttendance);
//            return null;
//        } catch (Exception e) {
//            LOGGER.error("Error while adding the dates for the employee");
//            throw new InternalServerErrorException("Error while adding the dates for the employee");
//        }
//    }

    public ResponseEntity<List<UserEntityAttendance>> getUserAttendance(Integer empId) {
        try {
            List<UserEntityAttendance> empDetails = employeeAttendanceRepository.findByEmployeeIdAndCurrentMonth(empId);
            return ResponseEntity.ok(empDetails);
        } catch (Exception e) {
            LOGGER.error("Getting error while retrieving the dates for specific employee");
            throw new InternalServerErrorException("Getting error while retrieving the dates for specific employee");
        }
    }

    public List<DateUserResponse> getEmpByDate(List<Date> dates) {
        try {
            Set<UserEntityAttendance> empDetails = employeeAttendanceRepository.findByDateIn(dates);
            Map<Date, Set<String>> empIdFromDate = empDetails.stream()
                .collect(Collectors.groupingBy(UserEntityAttendance::getDate,
                    Collectors.mapping(ue -> ue.getEmployee().getFirstName(), Collectors.toSet())));
            return dates.stream().map(k -> new DateUserResponse(
                    k, empIdFromDate.get(k) == null ? 0 : empIdFromDate.get(k).size(), empIdFromDate.get(k)))
                .sorted(Comparator.comparing(DateUserResponse::getDate)).toList();
        } catch (Exception e) {
            LOGGER.error("Getting error while getting all the dates");
            throw new InternalServerErrorException("Getting error while getting all the dates");
        }
    }


    public void deleteEmployee(Integer id) {
        try {
            UserEntity deleteEmp = employeeRepository.findById(id).orElseThrow(() -> new NotFoundException(ResponseCode.EMPLOYEE_NOT_FOUND.name()));
            adminDetailsDTO map = modelMapper.map(deleteEmp, adminDetailsDTO.class);
            employeeRepository.deleteById(map.getId());
        } catch (Exception e) {
            LOGGER.error("Getting error while deleting the employee info");
            throw new InternalServerErrorException("Getting error while deleting the employee info");
        }
    }

    public UserEntity updatePassword(Integer id, UserEntity user) {
        try {
            UserEntity passwordChange = employeeRepository.findById(id).orElseThrow(() -> new NotFoundException(ResponseCode.EMPLOYEE_NOT_FOUND.name()));
            passwordChange.setPassword(user.getPassword());
            employeeRepository.save(passwordChange);
            return passwordChange;
        } catch (Exception e) {
            return null;
        }
    }

    public List<EmployeeDetailsDTO> paginationSorting(String field) {
        List<UserEntity> user = employeeRepository.findAll(Sort.by(Sort.Direction.ASC, field));
        List<EmployeeDetailsDTO> empdetails = new ArrayList<>();
        for (UserEntity userfor : user) {
            EmployeeDetailsDTO map = modelMapper.map(userfor, EmployeeDetailsDTO.class);
            empdetails.add(map);
        }
        return empdetails;
    }

    public Page<EmployeeDetailsDTO> paginationWithSorting(Integer offset, Integer pagesize, String field) {
        Page<UserEntity> user = employeeRepository.findAll(PageRequest.of(offset, pagesize).withSort(Sort.by(field)));
        return new PageImpl<>(user.stream().map(u -> modelMapper.map(u, EmployeeDetailsDTO.class)).collect(toList()));
    }
}