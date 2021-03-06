/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Date;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import org.springframework.format.annotation.DateTimeFormat;

/**
 *
 * @author Jane
 */
@Entity
@JsonIgnoreProperties(value={"hibernateLazyInitializer","handler","fieldHandler"})
public class XiangMuFei {
    
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private Integer qy_id;
    private Integer xm_id;
    private Integer gys_id;
    private Integer kh_id;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date rq;
    private Double je = 0D;
    private Integer skr_id;
    private String bz;
    private transient String skrmc;
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQy_id() {
        return qy_id;
    }

    public void setQy_id(Integer qy_id) {
        this.qy_id = qy_id;
    }

    public Integer getXm_id() {
        return xm_id;
    }

    public void setXm_id(Integer xm_id) {
        this.xm_id = xm_id;
    }

    public Integer getKh_id() {
        return kh_id;
    }

    public void setKh_id(Integer kh_id) {
        this.kh_id = kh_id;
    }

    public Integer getGys_id() {
        return gys_id;
    }

    public void setGys_id(Integer gys_id) {
        this.gys_id = gys_id;
    }

    public Date getRq() {
        return rq;
    }

    public void setRq(Date rq) {
        this.rq = rq;
    }

    public Double getJe() {
        return je;
    }

    public void setJe(Double je) {
        this.je = je;
    }
    
    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public Integer getSkr_id() {
        return skr_id;
    }

    public void setSkr_id(Integer skr_id) {
        this.skr_id = skr_id;
    }

    public String getSkrmc() {
        return skrmc;
    }

    public void setSkrmc(String skrmc) {
        this.skrmc = skrmc;
    }
    
    @Override
    public int hashCode() {
        int hash = 3;
        hash = 37 * hash + Objects.hashCode(this.id);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final XiangMuFei other = (XiangMuFei) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
}
