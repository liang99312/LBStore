/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.RuKu;
import com.lb.lbstore.domain.RuKuDetail;
import com.lb.lbstore.domain.WuZiXhgg;
import com.lb.lbstore.domain.WuZiZiDian;
import java.util.Calendar;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

@Repository
public class RuKuDao extends BaseDao {
    
    public RuKu getRuKuDetailById(Integer id){
        RuKu ruKu = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            ruKu = (RuKu) session.createQuery("from RuKu where id=" + id);
            List<RuKuDetail> details = session.createQuery("select d.*,l.mc as wzlb from RuKuDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.rk_id=" + id).list();
            ruKu.setDetails(details);
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
        return ruKu;
    }
    
    public Integer saveRuKu(RuKu ruKu){
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(ruKu);
            session.flush();
            for(RuKuDetail detail:ruKu.getDetails()){
                detail.setCk_id(ruKu.getCk_id());
                detail.setDh(ruKu.getDh());
                detail.setGys_id(ruKu.getGys_id());
                detail.setKh_id(ruKu.getKh_id());
                detail.setLy(ruKu.getLy());
                detail.setQy_id(ruKu.getQy_id());
                detail.setRk_id(id);
                session.save(detail);
            }
            session.flush();
            tx.commit();
            result = id;
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
    
    public boolean updateRuKu(RuKu ruKu){
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(ruKu);
            session.flush();
            String deleteDetail = "delete from RuKuDetail where rk_id="+ruKu.getId();
            session.createSQLQuery(deleteDetail).executeUpdate();
            session.flush();
            for(RuKuDetail detail:ruKu.getDetails()){
                detail.setCk_id(ruKu.getCk_id());
                detail.setDh(ruKu.getDh());
                detail.setGys_id(ruKu.getGys_id());
                detail.setKh_id(ruKu.getKh_id());
                detail.setLy(ruKu.getLy());
                detail.setQy_id(ruKu.getQy_id());
                detail.setRk_id(ruKu.getId());
                session.save(detail);
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
    
    public boolean deleteRuKu(Integer id){
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from RuKuDetail where rk_id="+id;
            session.createSQLQuery(deleteDetail).executeUpdate();
            String deleteRk = "delete from RuKu where id="+id;
            session.createSQLQuery(deleteRk).executeUpdate();
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
    
    public boolean dealRuKu(RuKu ruKu,Integer a01_id){
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from RuKuDetail where rk_id="+ruKu.getId();
            List<RuKuDetail> list = session.createQuery(sql).list();
            for(RuKuDetail d:list){
                boolean flag = false;
                Integer zd_id = d.getWzzd_id();
                if(d.getWzzd_id() < 1){
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(d.getDw());
                    zd.setMc(d.getWzmc());
                    zd.setQy_id(ruKu.getQy_id());
                    zd.setState(0);
                    zd.setWzlb_id(d.getWzlb_id());
                    zd_id = (Integer) session.save(zd);
                    session.flush();
                    d.setWzzd_id(zd_id);
                    flag = true;
                }
                Integer xhgg_id = d.getXhgg_id();
                if(d.getXhgg_id() < 1){
                    WuZiXhgg xhgg = new WuZiXhgg();
                    xhgg.setBzq(d.getBzq());
                    xhgg.setMc(d.getXhgg());
                    xhgg.setQy_id(ruKu.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    d.setXhgg_id(xhgg_id);
                    flag = true;
                } 
                if(flag){
                    session.update(d);
                    session.flush();
                }
                
                Calendar c = Calendar.getInstance();
                c.setTime(d.getScrq());
                c.add(Calendar.DATE, Integer.parseInt("" + d.getBzq()));
                
                KuCun kc = new KuCun();
                kc.setBzgg(d.getBzgg());
                kc.setBzq(d.getBzq());
                kc.setBzrq(c.getTime());
                kc.setCk_id(d.getCk_id());
                kc.setDh(d.getDh());
                kc.setDj(d.getDj());
                kc.setDw(d.getDw());
                kc.setDymx(d.getDymx());
                kc.setGys_id(d.getGys_id());
                kc.setJlfs(d.getJlfs());
                kc.setKh_id(d.getKh_id());
                kc.setRkr_id(ruKu.getRkr_id());
                kc.setLy(d.getLy());
                kc.setPp(d.getPp());
                kc.setQy_id(d.getQy_id());
                kc.setRk_id(d.getRk_id());
                kc.setScc(d.getScc());
                kc.setScrq(d.getScrq());
                kc.setSl(d.getSl());
                kc.setSpr_id(a01_id);
                kc.setTxm(d.getTxm());
                kc.setTysx(d.getTysx());
                kc.setWzlb_id(d.getWzlb_id());
                kc.setWzmc(d.getWzmc());
                kc.setWzzd_id(zd_id);
                kc.setXhgg(d.getXhgg());
                kc.setXhgg_id(xhgg_id);
                kc.setZl(d.getZl());
                kc.setZldw(d.getZldw());
                kc.setSyl(kc.getSl());
                kc.setSyzl(kc.getZl());
                
                session.save(kc);
            }
            session.flush();
            String updateRk = "update RuKu set state=1,spr_id="+a01_id+" where id=" + ruKu.getId();
            session.createSQLQuery(updateRk).executeUpdate();
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
