/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author Jane
 */
@Entity
@JsonIgnoreProperties(value={"hibernateLazyInitializer","handler","fieldHandler"})
public class WuZiXhgg {

    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private Integer qy_id;
    private Integer wzzd_id;
    private String mc;
    private String dm;
    private Double sl = 0D;
    private Double jb = 0D;
    private Integer bzq = 0;

    public WuZiXhgg() {

    }

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

    public Integer getWzzd_id() {
        return wzzd_id;
    }

    public void setWzzd_id(Integer wzzd_id) {
        this.wzzd_id = wzzd_id;
    }

    public String getMc() {
        return mc;
    }

    public void setMc(String mc) {
        this.mc = mc;
    }

    public String getDm() {
        return dm;
    }

    public void setDm(String dm) {
        this.dm = dm;
    }

    public Double getSl() {
        return sl;
    }

    public void setSl(Double sl) {
        this.sl = sl;
    }

    public Double getJb() {
        return jb;
    }

    public void setJb(Double jb) {
        this.jb = jb;
    }

    public Integer getBzq() {
        return bzq;
    }

    public void setBzq(Integer bzq) {
        this.bzq = bzq;
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 11 * hash + Objects.hashCode(this.id);
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
        final WuZiXhgg other = (WuZiXhgg) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return mc;
    }
}
