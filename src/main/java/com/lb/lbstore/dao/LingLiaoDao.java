/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.LingLiao;
import com.lb.lbstore.domain.LingLiaoDetail;
import com.lb.lbstore.domain.WuZiXhgg;
import com.lb.lbstore.domain.WuZiZiDian;
import com.lb.lbstore.util.LshUtil;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Objects;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

@Repository
public class LingLiaoDao extends BaseDao {
    
    public LingLiao getLingLiaoDetailById(Integer id){
        LingLiao lingLiao = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {ll.*},kh.mc as khmc,ck.mc as ckmc,a01.mc as llrmc,a02.mc as sprmc from LingLiao ll "
                    + "left join CangKu ck on ll.ck_id=ck.id "
                    + "left join KeHu kh on ll.kh_id=kh.id "
                    + "left join A01 a01 on ll.llr_id=a01.id "
                    + "left join A01 a02 on ll.spr_id=a02.id "
                    + "where ll.id="+id;
            SQLQuery navtiveSQL = session.createSQLQuery(sql);  
            navtiveSQL.addEntity("ll", LingLiao.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("llrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING);  
            List list = navtiveSQL.list();
            List<LingLiao> list_ll = new ArrayList();
            for(Object obj:list){
                Object[] objs = (Object[]) obj;
                LingLiao ll = (LingLiao) objs[0];
                String khmc = (String) objs[1];
                String gysmc = (String) objs[2];
                String ckmc = (String) objs[3];
                String llrmc = (String) objs[4];
                String sprmc = (String) objs[5];
                ll.setKhmc(khmc);
                ll.setCkmc(ckmc);
                ll.setLlrmc(llrmc);
                ll.setSprmc(sprmc);
                list_ll.add(ll);
            }
            if(list_ll.isEmpty()){
                return null;
            }
            lingLiao = list_ll.get(0);
            
            String sql_d = "select {d.*},l.mc as wzlb from LingLiaoDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.ll_id=" + id;  
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);  
            navtiveSQL_d.addEntity("d",LingLiaoDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);             
            List<LingLiaoDetail> details = new ArrayList(); 
            List list_d = navtiveSQL_d.list();
            for(Object obj:list_d){
                Object[] objs = (Object[]) obj;
                LingLiaoDetail lld = (LingLiaoDetail) objs[0];
                String wzlb = (String) objs[1];
                lld.setWzlb(wzlb);
                details.add(lld);
            }
            lingLiao.setDetails(details);
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
        return lingLiao;
    }
    
    public List<LingLiao> queryLingLiaosByPage(HashMap map){
        List<LingLiao> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {ll.*},kh.mc as khmc,ck.mc as ckmc from LingLiao ll "
                    + "left join CangKu ck on ll.ck_id=ck.id left join KeHu kh on ll.kh_id=kh.id "
                    + "where ll.qy_id="+map.get("qy_id");
            if (map.containsKey("mc")) {
                sql += " and ll.wz like '%" + map.get("mc") + "%'";
            }
            if (map.containsKey("state")) {
                sql += " and ll.state = " + map.get("state");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);  
            navtiveSQL.addEntity("ll", LingLiao.class).addScalar("khmc", StandardBasicTypes.STRING).addScalar("ckmc", StandardBasicTypes.STRING);  
            List list = navtiveSQL.list();
            for(Object obj:list){
                Object[] objs = (Object[]) obj;
                LingLiao ll = (LingLiao) objs[0];
                String khmc = (String) objs[1];
                String gysmc = (String) objs[2];
                String ckmc = (String) objs[3];
                ll.setKhmc(khmc);
                ll.setCkmc(ckmc);
                result.add(ll);
            }
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
    
    public Integer saveLingLiao(LingLiao lingLiao){
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(lingLiao);
            session.flush();
            for(LingLiaoDetail detail:lingLiao.getDetails()){
                Integer zd_id = detail.getWzzd_id();
                if(detail.getWzzd_id() < 1){
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setQy_id(lingLiao.getQy_id());
                    zd.setState(0);
                    zd.setWzlb_id(detail.getWzlb_id());
                    zd_id = (Integer) session.save(zd);
                    session.flush();
                    detail.setWzzd_id(zd_id);
                }
                Integer xhgg_id = detail.getXhgg_id();
                if(detail.getXhgg_id() < 1){
                    WuZiXhgg xhgg = new WuZiXhgg();
                    xhgg.setBzq(detail.getBzq());
                    xhgg.setMc(detail.getXhgg());
                    xhgg.setQy_id(lingLiao.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                } 
                
                detail.setCk_id(lingLiao.getCk_id());
                detail.setKh_id(lingLiao.getKh_id());
                detail.setQy_id(lingLiao.getQy_id());
                detail.setLl_id(id);
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
    
    public boolean updateLingLiao(LingLiao lingLiao){
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(lingLiao);
            session.flush();
            String deleteDetail = "delete from LingLiaoDetail where ll_id="+lingLiao.getId();
            session.createSQLQuery(deleteDetail).executeUpdate();
            session.flush();
            for(LingLiaoDetail detail:lingLiao.getDetails()){
                Integer zd_id = detail.getWzzd_id();
                if(detail.getWzzd_id() < 1){
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setQy_id(lingLiao.getQy_id());
                    zd.setState(0);
                    zd.setWzlb_id(detail.getWzlb_id());
                    zd_id = (Integer) session.save(zd);
                    session.flush();
                    detail.setWzzd_id(zd_id);
                }
                Integer xhgg_id = detail.getXhgg_id();
                if(detail.getXhgg_id() < 1){
                    WuZiXhgg xhgg = new WuZiXhgg();
                    xhgg.setBzq(detail.getBzq());
                    xhgg.setMc(detail.getXhgg());
                    xhgg.setQy_id(lingLiao.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                } 
                
                detail.setCk_id(lingLiao.getCk_id());
                detail.setKh_id(lingLiao.getKh_id());
                detail.setQy_id(lingLiao.getQy_id());
                detail.setLl_id(lingLiao.getId());
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
    
    public boolean deleteLingLiao(Integer id){
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from LingLiaoDetail where ll_id="+id;
            session.createSQLQuery(deleteDetail).executeUpdate();
            String deleteLl = "delete from LingLiao where id="+id;
            session.createSQLQuery(deleteLl).executeUpdate();
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
    
    public boolean dealLingLiao(LingLiao lingLiao,Integer a01_id){
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from LingLiaoDetail where ll_id="+lingLiao.getId();
            List<LingLiaoDetail> list = session.createQuery(sql).list();
            Hashtable<Integer,LingLiaoDetail> detailTable = new Hashtable();
            StringBuilder sb = new StringBuilder();
            sb.append("(-1");
            for(LingLiaoDetail e:lingLiao.getDetails()){
                detailTable.put(e.getKc_id(), e);
                sb.append(",");
                sb.append(e.getId());
            }
            sb.append(")");
            String kcSql = "from KuCun where id in "+sb.toString();
            List<KuCun> kcList = session.createQuery(kcSql).list();
            for(KuCun kc:kcList){
                LingLiaoDetail detail = detailTable.get(kc.getId());
                if(detail != null){
                    if(kc.getSyzl() < detail.getSlzl()){
                        tx.rollback();
                        result = false;
                        return result;
                    }
                    kc.setSyzl(kc.getSyzl() - detail.getSlzl());
                    //处理库存
                    session.save(kc);
                }
            }
            session.flush();
            lingLiao = (LingLiao) session.load(LingLiao.class, lingLiao.getId());
            lingLiao.setState(1);
            lingLiao.setSpr_id(a01_id);
            lingLiao.setSpsj(new Date());
            lingLiao.setLsh(LshUtil.getLldLsh());
            session.update(lingLiao);
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
