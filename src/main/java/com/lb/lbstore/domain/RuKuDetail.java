/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.Date;
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
public class RuKuDetail {
    
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private Integer qy_id;
    private Integer ck_id;
    private Integer rk_id;
    private Integer gys_id;
    private Integer wzzd_id;
    private String wzmc;
    private Integer wzlb_id;
    private Integer xhgg_id;
    private String xhgg;
    private String pp;
    private String scc;
    private String txm;
    private Date scrq;
    private Double bzq;
    private Double dj;
    private String dw;    
    private String zldw;   
    private String jlfs = "pt"; //普通记录(pt)；总量记录(zl)；单元明细(mx)
    private Double bzgg = 1.0D;
    private Double sl;
    private Double zl;
    private String tysx;
    private String dymx;
    
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

    public Integer getRk_id() {
        return rk_id;
    }

    public void setRk_id(Integer rk_id) {
        this.rk_id = rk_id;
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

    public Double getSl() {
        return sl;
    }

    public void setSl(Double sl) {
        this.sl = sl;
    }

    public Double getZl() {
        return zl;
    }

    public void setZl(Double zl) {
        this.zl = zl;
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

    public Double getBzq() {
        return bzq;
    }

    public void setBzq(Double bzq) {
        this.bzq = bzq;
    }

    public String getJlfs() {
        return jlfs;
    }

    public void setJlfs(String jlfs) {
        this.jlfs = jlfs;
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
        final RuKuDetail other = (RuKuDetail) obj;
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