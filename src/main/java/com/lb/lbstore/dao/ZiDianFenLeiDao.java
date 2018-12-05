/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

@Repository
public class ZiDianFenLeiDao extends BaseDao {
    
    public boolean deleteZiDianFenLei(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.createSQLQuery("delete from zidian where zdfl_id="+id).executeUpdate();
            session.createSQLQuery("delete from zidianfenlei where id="+id).executeUpdate();
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (session != null) {
                    session.close();
                }
            } catch (Exception he) {
                he.printStackTrace();
            }
            
        }
        return result;
    }
    
    public boolean existZiDianFenLei(Integer qy_id, Integer id, String mc) {
        String sql = "";
        if (id > -1) {
            sql = "select 1 from zidianfenlei where qy_id=" + qy_id + " and id!=" + id + " and mc ='" + mc + "'";
        } else {
            sql = "select 1 from zidianfenlei where qy_id=" + qy_id + " and mc ='" + mc + "'";
        }
        List list = this.getSqlResult(sql);
        return !list.isEmpty();
    }
}
