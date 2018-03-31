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
public class QiYeDao extends BaseDao {
    
    public Integer saveQiYe(QiYe qy) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            result = (Integer) session.save(qy);
            A01 a01 = new A01();
            a01.setQy_id(result);
            a01.setBh(qy.getGly());
            a01.setDm(qy.getGly());
            a01.setMc("系统管理员");
            a01.setPassword("123456");
            a01.setState(8);
            a01.setA01qx("-1");
            session.save(a01);
            session.flush();
            tx.commit();
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
