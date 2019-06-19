/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.domain.QiYe;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class A01Dao extends BaseDao {

    public A01 checkLogin(String bh, String password) {
        List parameters = new ArrayList();
        parameters.add(bh);
        List list = this.getResult("from A01 where bh='?'", parameters.toArray());
        if (!list.isEmpty()) {
            Object obj = list.get(0);
            if (obj != null) {
                A01 a01 = (A01) obj;
                if (a01.getQy_id() > 0) {
                    List qyList = this.getResult("from QiYe where id=" + a01.getQy_id(), null);
                    if (!qyList.isEmpty()) {
                        QiYe qy = (QiYe) qyList.get(0);
                        if (qy.getState() == -1) {
                            A01 r = new A01();
                            r.setState(-9);
                            return r;
                        }
                    } else {
                        A01 r = new A01();
                        r.setState(-9);
                        return r;
                    }
                }
                password = password == null ? "" : password;
                if (password.equals(a01.getPassword())) {
                    return a01;
                }
            }
        }
        return null;
    }

    public boolean changePassword(int id, String password) {
        List parameters = new ArrayList();
        parameters.add(id);
        String sql = "update a01 set password='" + password + "' where id=?";
        return this.excuteSql(sql, parameters.toArray());
    }

    public boolean changeQuanXian(int id, String qx) {
        List parameters = new ArrayList();
        parameters.add(id);
        String sql = "update a01 set a01qx='" + qx + "' where id=?";
        return this.excuteSql(sql, parameters.toArray());
    }

    public boolean existA01(Integer qy_id, Integer id, String mc, String bh) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        String sql = "";
        if (id > -1) {
            sql = "select 1 from a01 where qy_id=? and id!=? and (mc ='?' or bh ='?')";
            parameters.add(id);
            parameters.add(mc);
            parameters.add(bh);
        } else {
            sql = "select 1 from a01 where qy_id=? and (mc ='?' or bh ='?')";
            parameters.add(mc);
            parameters.add(bh);
        }
        List list = this.getSqlResult(sql, parameters.toArray());
        return !list.isEmpty();
    }
}
