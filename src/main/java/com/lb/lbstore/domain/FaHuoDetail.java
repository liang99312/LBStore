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
public class FaHuoDetail {
    
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private Integer qy_id;
    private Integer ck_id;
    private Integer fh_id;
    private Integer kh_id;
    private Integer kc_id;
    private Integer gys_id;
    private Integer wzzd_id;
    private String wzmc;
    private Integer wzlb_id;
    private transient String wzlb;
    private Integer xhgg_id;
    private String xhgg;
    private String dh;
    private String pp;
    private String scc;
    private String txm;
    private String pc;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    private Date scrq;
    private Integer bzq;
    private Double dj;
    private String dw;    
    private String zldw;   
    private String jlfs = "pt"; //普通记录(pt)；总量记录(zl)；单元明细(mx)
    private Double bzgg = 1.0D; //包装规格
    private Double fhl = 1.0D;
    private Double fhzl = 1.0D;
    private String tysx;
    private String dymx;
    private String kw;
    private String bz;
    private transient String ckmc;
    private transient String khmc;
    private transient String fhrmc;
    private transient String sprmc;
    private transient String lsh;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private transient Date sj;
    private transient Integer fhr_id;
    private transient String qrq,zrq;
    
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

    public Integer getGys_id() {
        return gys_id;
    }

    public void setGys_id(Integer gys_id) {
        this.gys_id = gys_id;
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

    public Integer getWzzd_id() {
        return wzzd_id;
    }

    public void setWzzd_id(Integer wzzd_id) {
        this.wzzd_id = wzzd_id;
    }

    public String getWzmc() {
        return wzmc;
    }

    public void setWzmc(String wzmc) {
        this.wzmc = wzmc;
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
    
    public String getPp() {
        return pp;
    }

    public void setPp(String pp) {
        this.pp = pp;
    }

    public String getScc() {
        return scc;
    }

    public void setScc(String scc) {
        this.scc = scc;
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

    public Double getBzgg() {
        return bzgg;
    }

    public void setBzgg(Double bzgg) {
        this.bzgg = bzgg;
    }

    public Double getFhl() {
        return fhl;
    }

    public void setFhl(Double fhl) {
        this.fhl = fhl;
    }

    public Double getFhzl() {
        return fhzl;
    }

    public void setFhzl(Double fhzl) {
        this.fhzl = fhzl;
    }

    public String getTysx() {
        return tysx;
    }

    public void setTysx(String tysx) {
        this.tysx = tysx;
    }

    public String getTxm() {
        return txm;
    }

    public void setTxm(String txm) {
        this.txm = txm;
    }

    public String getDymx() {
        return dymx;
    }

    public void setDymx(String dymx) {
        this.dymx = dymx;
    }

    public String getZldw() {
        return zldw;
    }

    public void setZldw(String zldw) {
        this.zldw = zldw;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

    public Integer getBzq() {
        return bzq;
    }

    public void setBzq(Integer bzq) {
        this.bzq = bzq;
    }

    public String getJlfs() {
        return jlfs;
    }

    public void setJlfs(String jlfs) {
        this.jlfs = jlfs;
    }

    public String getKw() {
        return kw;
    }

    public void setKw(String kw) {
        this.kw = kw;
    }

    public Integer getFh_id() {
        return fh_id;
    }

    public void setFh_id(Integer fh_id) {
        this.fh_id = fh_id;
    }

    public Integer getKc_id() {
        return kc_id;
    }

    public void setKc_id(Integer kc_id) {
        this.kc_id = kc_id;
    }

    public String getDh() {
        return dh;
    }

    public void setDh(String dh) {
        this.dh = dh;
    }

    public String getPc() {
        return pc;
    }

    public void setPc(String pc) {
        this.pc = pc;
    }

    public String getCkmc() {
        return ckmc;
    }

    public void setCkmc(String ckmc) {
        this.ckmc = ckmc;
    }

    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
    }

    public String getFhrmc() {
        return fhrmc;
    }

    public void setFhrmc(String fhrmc) {
        this.fhrmc = fhrmc;
    }

    public String getSprmc() {
        return sprmc;
    }

    public void setSprmc(String sprmc) {
        this.sprmc = sprmc;
    }

    public String getLsh() {
        return lsh;
    }

    public void setLsh(String lsh) {
        this.lsh = lsh;
    }

    public Date getSj() {
        return sj;
    }

    public void setSj(Date sj) {
        this.sj = sj;
    }

    public Integer getFhr_id() {
        return fhr_id;
    }

    public void setFhr_id(Integer fhr_id) {
        this.fhr_id = fhr_id;
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

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
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
        final FaHuoDetail other = (FaHuoDetail) obj;
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }
    
    @Override
    public String toString(){
        return wzmc;
    }
}
