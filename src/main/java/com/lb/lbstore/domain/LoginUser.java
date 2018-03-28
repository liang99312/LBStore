/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.domain;


public class LoginUser {

    private Integer id;
    private Integer qy_id;
    private String qy;
    private String bh;
    private String mc;
    private String dm;
    private String a0111;
    private String a0105;
    private String session_id;
    private Integer state = 0;

    public LoginUser() {
    }

    public LoginUser(String bh, String mc, String a0111, String a0105) {
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

    public String getQy() {
        return qy;
    }

    public void setQy(String qy) {
        this.qy = qy;
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

    public String getSession_id() {
        return session_id;
    }

    public void setSession_id(String session_id) {
        this.session_id = session_id;
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
        LoginUser other = (LoginUser) obj;
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
