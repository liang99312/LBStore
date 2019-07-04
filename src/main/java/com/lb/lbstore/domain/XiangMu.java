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
public class XiangMu {
    
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private Integer qy_id;
    private Integer kh_id;
    private Integer kdr_id;
    private Integer spr_id;
    private String mc;
    private String lsh;
    private String wz;
    private String dh;
    private Double jhsl = 0D;
    private Double wcsl = 0D;
    private Double fhsl = 0D;
    private Double jhje = 0D;
    private Double wcje = 0D;
    private Double fhje = 0D;
    private Double yfje = 0D;
    private Double dfje = 0D;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date kdsj;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date spsj;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date wcsj;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date fhsj;
    private String bz;
    private Integer state;//0:未办理；1：已办理
    private transient List<XiangMuDetail> details = new ArrayList();
    private transient String qrq;
    private transient String zrq;
    private transient String khmc;
    private transient String kdrmc;
    private transient String sprmc;

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

    public Integer getKh_id() {
        return kh_id;
    }

    public void setKh_id(Integer kh_id) {
        this.kh_id = kh_id;
    }

    public Integer getKdr_id() {
        return kdr_id;
    }

    public void setKdr_id(Integer kdr_id) {
        this.kdr_id = kdr_id;
    }

    public Integer getSpr_id() {
        return spr_id;
    }

    public void setSpr_id(Integer spr_id) {
        this.spr_id = spr_id;
    }

    public String getMc() {
        return mc;
    }

    public void setMc(String mc) {
        this.mc = mc;
    }

    public String getLsh() {
        return lsh;
    }

    public void setLsh(String lsh) {
        this.lsh = lsh;
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

    public Double getJhsl() {
        return jhsl;
    }

    public void setJhsl(Double jhsl) {
        this.jhsl = jhsl;
    }

    public Double getJhje() {
        return jhje;
    }

    public void setJhje(Double jhje) {
        this.jhje = jhje;
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

    public Date getKdsj() {
        return kdsj;
    }

    public void setKdsj(Date kdsj) {
        this.kdsj = kdsj;
    }

    public Date getSpsj() {
        return spsj;
    }

    public void setSpsj(Date spsj) {
        this.spsj = spsj;
    }

    public Date getWcsj() {
        return wcsj;
    }

    public void setWcsj(Date wcsj) {
        this.wcsj = wcsj;
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

    public Double getWcje() {
        return wcje;
    }

    public void setWcje(Double wcje) {
        this.wcje = wcje;
    }

    public Double getFhje() {
        return fhje;
    }

    public void setFhje(Double fhje) {
        this.fhje = fhje;
    }

    public Date getFhsj() {
        return fhsj;
    }

    public void setFhsj(Date fhsj) {
        this.fhsj = fhsj;
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

    public List<XiangMuDetail> getDetails() {
        return details;
    }

    public void setDetails(List<XiangMuDetail> details) {
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
        final XiangMu other = (XiangMu) obj;
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
