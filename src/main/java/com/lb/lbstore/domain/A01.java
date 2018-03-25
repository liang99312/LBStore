/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@JsonIgnoreProperties(value={"hibernateLazyInitializer","handler","fieldHandler"})
public class A01 {

    @Id @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private Integer qy_id;
    private String bh;
    private String mc;
    private String dm;
    private String a0111;
    private String a0105;
    private String a01pic;
    private String a01qx;
    private String password;
    private Integer state = 0;

    public A01() {
    }

    public A01(String bh, String mc, String a0111, String a0105) {
        this.bh = bh;
        this.mc = mc;
        this.a0111 = a0111;
        this.a0105 = a0105;
    }

    public Integer getId() {
        return this.id;
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

    public String getBh() {
        return bh;
    }

    public void setBh(String bh) {
        this.bh = bh;
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

    public String getA0111() {
        return a0111;
    }

    public void setA0111(String a0111) {
        this.a0111 = a0111;
    }

    public String getA0105() {
        return a0105;
    }

    public void setA0105(String a0105) {
        this.a0105 = a0105;
    }

    public String getA01pic() {
        return a01pic;
    }

    public void setA01pic(String a01pic) {
        this.a01pic = a01pic;
    }

    public String getA01qx() {
        return a01qx;
    }

    public void setA01qx(String a01qx) {
        this.a01qx = a01qx;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((bh == null) ? 0 : bh.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        A01 other = (A01) obj;
        if (bh == null) {
            if (other.bh != null) {
                return false;
            }
        } else if (!bh.equals(other.bh)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        // TODO Auto-generated method stub
        return mc;
    }

}
