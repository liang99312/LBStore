/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
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
public class TuiHuo {
    
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String lsh;
    private Integer qy_id;
    private Integer ck_id;
    private Integer kh_id;
    private Integer thr_id;
    private Integer spr_id;
    private String wz;
    private String dh;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date sj;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date spsj;
    private Double sl = 0D;
    private Double je = 0D;
    private Double yfje = 0D;
    private Double dfje = 0D;
    private String yy;
    private String bz;
    private Integer state;//0:未办理；1：已办理；
    private transient List<TuiHuoDetail> details = new ArrayList();
    private transient String qrq;
    private transient String zrq;
    private transient String ckmc;
    private transient String khmc;
    private transient String thrmc;
    private transient String sprmc;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLsh() {
        return lsh;
    }

    public void setLsh(String lsh) {
        this.lsh = lsh;
    }

    public Integer getQy_id() {
        return qy_id;
    }

    public void setQy_id(Integer qy_id) {
        this.qy_id = qy_id;
    }

    public Integer getCk_id() {
        return ck_id;
    }

    public void setCk_id(Integer ck_id) {
        this.ck_id = ck_id;
    }

    public Integer getKh_id() {
        return kh_id;
    }

    public void setKh_id(Integer kh_id) {
        this.kh_id = kh_id;
    }

    public Integer getThr_id() {
        return thr_id;
    }

    public void setThr_id(Integer thr_id) {
        this.thr_id = thr_id;
    }

    public Integer getSpr_id() {
        return spr_id;
    }

    public void setSpr_id(Integer spr_id) {
        this.spr_id = spr_id;
    }

    public String getWz() {
        return wz;
    }

    public void setWz(String wz) {
        this.wz = wz;
    }

    public String getDh() {
        return dh;
    }

    public void setDh(String dh) {
        this.dh = dh;
    }

    public Date getSj() {
        return sj;
    }

    public void setSj(Date sj) {
        this.sj = sj;
    }

    public Date getSpsj() {
        return spsj;
    }

    public void setSpsj(Date spsj) {
        this.spsj = spsj;
    }

    public Double getSl() {
        return sl;
    }

    public void setSl(Double sl) {
        this.sl = sl;
    }

    public Double getJe() {
        return je;
    }

    public void setJe(Double je) {
        this.je = je;
    }

    public Double getYfje() {
        return yfje;
    }

    public void setYfje(Double yfje) {
        this.yfje = yfje;
    }

    public Double getDfje() {
        return dfje;
    }

    public void setDfje(Double dfje) {
        this.dfje = dfje;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public List<TuiHuoDetail> getDetails() {
        return details;
    }

    public void setDetails(List<TuiHuoDetail> details) {
        this.details = details;
    }

    public String getQrq() {
        return qrq;
    }

    public void setQrq(String qrq) {
        this.qrq = qrq;
    }

    public String getZrq() {
        return zrq;
    }

    public void setZrq(String zrq) {
        this.zrq = zrq;
    }

    public String getCkmc() {
        return ckmc;
    }

    public void setCkmc(String ckmc) {
        this.ckmc = ckmc;
    }

    public String getThrmc() {
        return thrmc;
    }

    public void setThrmc(String thrmc) {
        this.thrmc = thrmc;
    }

    public String getSprmc() {
        return sprmc;
    }

    public void setSprmc(String sprmc) {
        this.sprmc = sprmc;
    }
    
    public String getYy() {
        return yy;
    }

    public void setYy(String yy) {
        this.yy = yy;
    }

    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
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
        final TuiHuo other = (TuiHuo) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
    @Override
    public String toString(){
        return lsh;
    }
}
