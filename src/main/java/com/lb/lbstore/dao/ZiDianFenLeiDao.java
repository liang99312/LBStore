/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.A01;
import com.lb.lbstore.domain.QiYe;
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
}
