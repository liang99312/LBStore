/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.CangKuA01;
import com.lb.lbstore.domain.KuWei;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

@Repository
public class CangKuDao extends BaseDao {

    public boolean saveCangKuA01Kw(List<CangKuA01> a01s,List<KuWei> kws,Integer id){
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteA01 = "delete from CangKuA01 where ck_id="+id;
            session.createSQLQuery(deleteA01).executeUpdate();
            String deleteKw = "delete from KuWei where ck_id="+id;
            session.createSQLQuery(deleteKw).executeUpdate();
            session.flush();
            for(CangKuA01 cka:a01s){
                session.save(cka);
            }
            for(KuWei kw:kws){
                session.save(kw);
            }
            session.flush();
            tx.commit();
            result = true;
        } catch (Exception e) {
            tx.rollback();
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
