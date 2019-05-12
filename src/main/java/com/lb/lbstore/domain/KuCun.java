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
public class KuCun {
    
    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private Integer qy_id;
    private Integer ck_id;
    private Integer rk_id;
    private Integer rkd_id;
    private Integer kh_id;
    private Integer gys_id;
    private Integer wzzd_id;
    private String wzmc;
    private Integer wzlb_id;
    private Integer xhgg_id;
    private Integer rkr_id;
    private Integer spr_id;
    private String xhgg;
    private String ly; //供应商；客户；生产；
    private String dh; //单号
    private String pp;
    private String scc;
    private String txm;
    private String pc;
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    @JsonFormat(pattern="yyyy-MM-dd HH:mm",timezone = "GMT+8")
    private Date rksj;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    private Date scrq;
    private Integer bzq;
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
    private Date bzrq;
    private Double dj;
    private Double ckdj;
    private String dw;    
    private String zldw;   
    private String jlfs = "pt"; //普通记录(pt)；总量记录(zl)；单元明细(mx)
    private Double bzgg = 1.0D; //包装规格
    private Double sl;
    private Double syl;
    private Double zl;
    private Double syzl;
    private String tysx;
    private String dymx;
    private String kw;
    private String bz;
    private transient Date qrq;
    private transient Date zrq;
    private transient String ckmc;
    private transient String khmc;
    private transient String gysmc;
    private transient String rkrmc;
    private transient String sprmc;
    private transient String wzlb;
    
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

    public Integer getRkr_id() {
        return rkr_id;
    }

    public void setRkr_id(Integer rkr_id) {
        this.rkr_id = rkr_id;
    }

    public Integer getSpr_id() {
        return spr_id;
    }

    public void setSpr_id(Integer spr_id) {
        this.spr_id = spr_id;
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

    public Integer getBzq() {
        return bzq;
    }

    public void setBzq(Integer bzq) {
        this.bzq = bzq;
    }

    public Date getBzrq() {
        return bzrq;
    }

    public void setBzrq(Date bzrq) {
        this.bzrq = bzrq;
    }

    public String getJlfs() {
        return jlfs;
    }

    public void setJlfs(String jlfs) {
        this.jlfs = jlfs;
    }

    public Integer getKh_id() {
        return kh_id;
    }

    public void setKh_id(Integer kh_id) {
        this.kh_id = kh_id;
    }

    public String getLy() {
        return ly;
    }

    public void setLy(String ly) {
        this.ly = ly;
    }

    public String getDh() {
        return dh;
    }

    public void setDh(String dh) {
        this.dh = dh;
    }

    public Double getSyl() {
        return syl;
    }

    public void setSyl(Double syl) {
        this.syl = syl;
    }

    public Double getSyzl() {
        return syzl;
    }

    public void setSyzl(Double syzl) {
        this.syzl = syzl;
    }

    public String getKw() {
        return kw;
    }

    public void setKw(String kw) {
        this.kw = kw;
    }

    public Integer getRkd_id() {
        return rkd_id;
    }

    public void setRkd_id(Integer rkd_id) {
        this.rkd_id = rkd_id;
    }

    public Date getRksj() {
        return rksj;
    }

    public void setRksj(Date rksj) {
        this.rksj = rksj;
    }

    public Double getCkdj() {
        return ckdj;
    }

    public void setCkdj(Double ckdj) {
        this.ckdj = ckdj;
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

    public String getGysmc() {
        return gysmc;
    }

    public void setGysmc(String gysmc) {
        this.gysmc = gysmc;
    }

    public String getRkrmc() {
        return rkrmc;
    }

    public void setRkrmc(String rkrmc) {
        this.rkrmc = rkrmc;
    }

    public String getSprmc() {
        return sprmc;
    }

    public void setSprmc(String sprmc) {
        this.sprmc = sprmc;
    }

    public String getWzlb() {
        return wzlb;
    }

    public void setWzlb(String wzlb) {
        this.wzlb = wzlb;
    }

    public Date getQrq() {
        return qrq;
    }

    public void setQrq(Date qrq) {
        this.qrq = qrq;
    }

    public Date getZrq() {
        return zrq;
    }

    public void setZrq(Date zrq) {
        this.zrq = zrq;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getPc() {
        return pc;
    }

    public void setPc(String pc) {
        this.pc = pc;
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
        final KuCun other = (KuCun) obj;
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
