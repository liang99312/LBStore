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
@JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler", "fieldHandler"})
public class XiangMuDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Integer qy_id;
    private Integer xm_id;
    private Integer kh_id;
    private String lsh;
    private Integer wzzd_id;
    private String wzbm;
    private String wzmc;
    private Integer wzlb_id;
    private transient String wzlb;
    private Integer xhgg_id;
    private String xhgg;
    private Double dj;
    private String dw;
    private Double jhsl = 0D;    
    private Double wcsl = 0D;
    private Double fhsl = 0D;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Date jhsj;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Date wcsj;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "GMT+8")
    private Date fhsj;
    private Integer xq_id;
    private String xq;
    private String bz;
    private Integer state; //0:未审批；1：已审批；2:已完成；21:部分完成；3:已发货；
    private transient String khmc;
    private transient String kdrmc;
    private transient String sprmc;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private transient Date sj;
    private transient Integer kdr_id;
    private transient String qrq,zrq,xqmc,dh,xmmc;

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

    public String getLsh() {
        return lsh;
    }

    public void setLsh(String lsh) {
        this.lsh = lsh;
    }

    public Integer getWzzd_id() {
        return wzzd_id;
    }

    public void setWzzd_id(Integer wzzd_id) {
        this.wzzd_id = wzzd_id;
    }

    public String getWzbm() {
        return wzbm;
    }

    public void setWzbm(String wzbm) {
        this.wzbm = wzbm;
    }

    public String getWzmc() {
        return wzmc;
    }

    public void setWzmc(String wzmc) {
        this.wzmc = wzmc;
    }

    public Integer getWzlb_id() {
        return wzlb_id;
    }

    public void setWzlb_id(Integer wzlb_id) {
        this.wzlb_id = wzlb_id;
    }

    public String getWzlb() {
        return wzlb;
    }

    public void setWzlb(String wzlb) {
        this.wzlb = wzlb;
    }

    public Integer getXhgg_id() {
        return xhgg_id;
    }

    public void setXhgg_id(Integer xhgg_id) {
        this.xhgg_id = xhgg_id;
    }

    public String getXhgg() {
        return xhgg;
    }

    public void setXhgg(String xhgg) {
        this.xhgg = xhgg;
    }

    public Double getDj() {
        return dj;
    }

    public void setDj(Double dj) {
        this.dj = dj;
    }

    public String getDw() {
        return dw;
    }

    public void setDw(String dw) {
        this.dw = dw;
    }
    
    public Double getJhsl() {
        return jhsl;
    }

    public void setJhsl(Double jhsl) {
        this.jhsl = jhsl;
    }

    public Date getJhsj() {
        return jhsj;
    }

    public void setJhsj(Date jhsj) {
        this.jhsj = jhsj;
    }

    public Date getWcsj() {
        return wcsj;
    }

    public void setWcsj(Date wcsj) {
        this.wcsj = wcsj;
    }

    public Integer getXq_id() {
        return xq_id;
    }

    public void setXq_id(Integer xq_id) {
        this.xq_id = xq_id;
    }

    public String getXq() {
        return xq;
    }

    public void setXq(String xq) {
        this.xq = xq;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
    }

    public String getKdrmc() {
        return kdrmc;
    }

    public void setKdrmc(String kdrmc) {
        this.kdrmc = kdrmc;
    }

    public String getSprmc() {
        return sprmc;
    }

    public void setSprmc(String sprmc) {
        this.sprmc = sprmc;
    }

    public Date getSj() {
        return sj;
    }

    public void setSj(Date sj) {
        this.sj = sj;
    }

    public Integer getKdr_id() {
        return kdr_id;
    }

    public void setKdr_id(Integer kdr_id) {
        this.kdr_id = kdr_id;
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

    public Double getWcsl() {
        return wcsl;
    }

    public void setWcsl(Double wcsl) {
        this.wcsl = wcsl;
    }

    public Double getFhsl() {
        return fhsl;
    }

    public void setFhsl(Double fhsl) {
        this.fhsl = fhsl;
    }

    public Date getFhsj() {
        return fhsj;
    }

    public void setFhsj(Date fhsj) {
        this.fhsj = fhsj;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getXqmc() {
        return xqmc;
    }

    public void setXqmc(String xqmc) {
        this.xqmc = xqmc;
    }

    public String getDh() {
        return dh;
    }

    public void setDh(String dh) {
        this.dh = dh;
    }

    public String getXmmc() {
        return xmmc;
    }

    public void setXmmc(String xmmc) {
        this.xmmc = xmmc;
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
        final XiangMuDetail other = (XiangMuDetail) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return wzmc;
    }
}
