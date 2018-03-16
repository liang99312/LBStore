/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.A01;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class A01Dao extends BaseDao {

    public A01 checkLogin(String bh, String password) {
        List list = this.getResult("from A01 where bh='" + bh + "'", null);
        if (!list.isEmpty()) {
            Object obj = list.get(0);
            if (obj != null) {
                A01 a01 = (A01) obj;
                password = password == null ? "" : password;
                if (password.equals(a01.getPassword())) {
                    return a01;
                }
            }
        }
        return null;
    }

    public boolean changePassword(int id, String password) {
        String sql = "update a01 set password='" + password + "' where id=" + id;
        return this.excuteSql(sql);
    }
    
    public boolean changeQuanXian(int id, String qx) {
        String sql = "update a01 set a01qx='" + qx + "' where id=" + id;
        return this.excuteSql(sql);
    }
}
