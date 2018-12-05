/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.domain.QiYe;
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
        String sql = "update a01 set password='" + password + "' where id=" + id;
        return this.excuteSql(sql);
    }

    public boolean changeQuanXian(int id, String qx) {
        String sql = "update a01 set a01qx='" + qx + "' where id=" + id;
        return this.excuteSql(sql);
    }

    public boolean existA01(Integer qy_id, Integer id, String mc, String bh) {
        String sql = "";
        if (id > -1) {
            sql = "select 1 from a01 where qy_id=" + qy_id + " and id!=" + id + " and (mc ='" + mc + "' or bh ='" + bh + "')";
        } else {
            sql = "select 1 from a01 where qy_id=" + qy_id + " and (mc ='" + mc + "' or bh ='" + bh + "')";
        }
        List list = this.getSqlResult(sql);
        return !list.isEmpty();
    }
}
