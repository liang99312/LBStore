/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
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
    
    public LingLiao getLingLiaoWithDetailById(Integer id) {
        LingLiao lingLiao = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {ll.*},kh.mc as khmc,ck.mc as ckmc,a01.mc as llrmc,a02.mc as sprmc from LingLiao ll "
                    + "left join CangKu ck on ll.ck_id=ck.id "
                    + "left join KeHu kh on ll.kh_id=kh.id "
                    + "left join A01 a01 on ll.llr_id=a01.id "
                    + "left join A01 a02 on ll.spr_id=a02.id "
                    + "where ll.id=" + id;
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("ll", LingLiao.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("llrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<LingLiao> list_ll = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                LingLiao ll = (LingLiao) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                String llrmc = (String) objs[3];
                String sprmc = (String) objs[4];
                ll.setKhmc(khmc);
                ll.setCkmc(ckmc);
                ll.setLlrmc(llrmc);
                ll.setSprmc(sprmc);
                list_ll.add(ll);
            }
            if (list_ll.isEmpty()) {
                return null;
            }
            lingLiao = list_ll.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from LingLiaoDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.ll_id=" + id;
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.addEntity("d", LingLiaoDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<LingLiaoDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
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

    public LingLiaoDetail getLingLiaoDetailById(Integer id) {
        LingLiaoDetail lingLiaoDetail = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {lld.*},kh.mc as khmc,ck.mc as ckmc,ll.spsj as sj,ll.lsh as lsh,a01.mc as llrmc,l.mc as wzlb from LingLiaoDetail lld "
                    + "left join LingLiao ll on lld.ll_id=ll.id "
                    + "left join CangKu ck on lld.ck_id=ck.id "
                    + "left join KeHu kh on ll.kh_id=kh.id "
                    + "left join A01 a01 on ll.llr_id=a01.id "
                    + "left join WuZiLeiBie l on lld.wzlb_id=l.id "
                    + "where lld.id=" + id;
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("lld", LingLiaoDetail.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("sj", StandardBasicTypes.DATE)
                    .addScalar("lsh", StandardBasicTypes.STRING)
                    .addScalar("llrmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                lingLiaoDetail = (LingLiaoDetail) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                Date sj = (Date) objs[3];
                String lsh = (String) objs[4];
                String llrmc = (String) objs[5];
                String wzlb = (String) objs[6];
                lingLiaoDetail.setKhmc(khmc);
                lingLiaoDetail.setCkmc(ckmc);
                lingLiaoDetail.setSj(sj);
                lingLiaoDetail.setLsh(lsh);
                lingLiaoDetail.setLlrmc(llrmc);
                lingLiaoDetail.setWzlb(wzlb);
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
        return lingLiaoDetail;
    }

    public List<LingLiao> queryLingLiaosByPage(HashMap map) {
        List<LingLiao> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {ll.*},kh.mc as khmc,ck.mc as ckmc from LingLiao ll "
                    + "left join CangKu ck on ll.ck_id=ck.id left join KeHu kh on ll.kh_id=kh.id "
                    + "where ll.qy_id=" + map.get("qy_id");
            if (map.containsKey("mc")) {
                sql += " and ll.wz like '%" + map.get("mc") + "%'";
            }
            if (map.containsKey("state")) {
                sql += " and ll.state = " + map.get("state");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("ll", LingLiao.class).addScalar("khmc", StandardBasicTypes.STRING).addScalar("ckmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                LingLiao ll = (LingLiao) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
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
    
    public List<LingLiaoDetail> queryLingLiaoDetailsByPage(HashMap map) {
        List<LingLiaoDetail> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {lld.*},kh.mc as khmc,ck.mc as ckmc from LingLiaoDetail lld left join LingLiao ll on lld.ll_id=ll.id "
                    + "left join CangKu ck on ll.ck_id=ck.id left join KeHu kh on ll.kh_id=kh.id "
                    + "where ll.qy_id=" + map.get("qy_id");
            if (map.containsKey("mc")) {
                sql += " and ll.wz like '%" + map.get("mc") + "%'";
            }
            if (map.containsKey("state")) {
                sql += " and ll.state = " + map.get("state");
            }
            if (map.containsKey("lsh")) {
                sql += " and ll.lsh = " + map.get("lsh");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("lld", LingLiaoDetail.class).addScalar("khmc", StandardBasicTypes.STRING).addScalar("ckmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                LingLiaoDetail lld = (LingLiaoDetail) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                lld.setKhmc(khmc);
                lld.setCkmc(ckmc);
                result.add(lld);
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
    
    public List<LingLiaoDetail> queryLingLiaoDetailsTop100(LingLiaoDetail detail) {
        List<LingLiaoDetail> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {lld.*},kh.mc as khmc,ck.mc as ckmc,ll.spsj as sj,ll.lsh as lsh,a01.mc as llrmc,l.mc as wzlb from LingLiaoDetail lld "
                    + "left join LingLiao ll on lld.ll_id=ll.id "
                    + "left join CangKu ck on lld.ck_id=ck.id "
                    + "left join KeHu kh on ll.kh_id=kh.id "
                    + "left join A01 a01 on ll.llr_id=a01.id "
                    + "left join WuZiLeiBie l on lld.wzlb_id=l.id "
                    + "where ll.qy_id=" + detail.getQy_id();
            if (detail.getLsh() != null && !"".equals(detail.getLsh())) {
                sql += " and ll.lsh = '" + detail.getLsh() + "'";
            }
            if (detail.getCk_id() != null) {
                sql += " and lld.ck_id = " + detail.getCk_id();
            }
            if (detail.getWzlb_id() != null) {
                sql += " and lld.wzlb_id = " + detail.getWzlb_id();
            }
            if (detail.getWzmc() != null && !"".equals(detail.getWzmc())) {
                sql += " and lld.wzmc = '" + detail.getWzmc() + "'";
            }
            if (detail.getXhgg() != null && !"".equals(detail.getXhgg())) {
                sql += " and lld.xhgg = '" + detail.getXhgg() + "'";
            }
            if (detail.getKh_id() != null) {
                sql += " and lld.kh_id = " + detail.getKh_id();
            }
            if (detail.getGys_id() != null) {
                sql += " and lld.ck_id = " + detail.getGys_id();
            }
            if (detail.getLlr_id() != null) {
                sql += " and ll.llr_id = " + detail.getLlr_id();
            }
            if (detail.getTxm() != null && !"".equals(detail.getTxm())) {
                sql += " and lld.txm = '" + detail.getTxm() + "'";
            }
            if (detail.getQrq() != null && !"".equals(detail.getQrq())) {
                sql += " and ll.spsj >= '" + detail.getQrq() + "'";
            }
            if (detail.getZrq() != null && !"".equals(detail.getZrq())) {
                sql += " and ll.spsj <= '" + detail.getZrq() + "'";
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("lld", LingLiaoDetail.class)
                    .addScalar("khmc", StandardBasicTypes.STRING)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("sj", StandardBasicTypes.DATE)
                    .addScalar("lsh", StandardBasicTypes.STRING)
                    .addScalar("llrmc", StandardBasicTypes.STRING)
                    .addScalar("wzlb", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                LingLiaoDetail lld = (LingLiaoDetail) objs[0];
                String khmc = (String) objs[1];
                String ckmc = (String) objs[2];
                Date sj = (Date) objs[3];
                String lsh = (String) objs[4];
                String llrmc = (String) objs[5];
                String wzlb = (String) objs[6];
                lld.setKhmc(khmc);
                lld.setCkmc(ckmc);
                lld.setSj(sj);
                lld.setLsh(lsh);
                lld.setLlrmc(llrmc);
                lld.setWzlb(wzlb);
                result.add(lld);
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

    public Integer saveLingLiao(LingLiao lingLiao) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(lingLiao);
            session.flush();
            for (LingLiaoDetail detail : lingLiao.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
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
                if (detail.getXhgg_id() < 1) {
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
                detail.setDh(lingLiao.getDh());
                if ("pt".equals(detail.getJlfs())) {
                    detail.setSlzl(detail.getSll());
                }
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

    public boolean updateLingLiao(LingLiao lingLiao) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(lingLiao);
            session.flush();
            String deleteDetail = "delete from LingLiaoDetail where ll_id=" + lingLiao.getId();
            session.createSQLQuery(deleteDetail).executeUpdate();
            session.flush();
            for (LingLiaoDetail detail : lingLiao.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
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
                if (detail.getXhgg_id() < 1) {
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

    public boolean deleteLingLiao(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from LingLiaoDetail where ll_id=" + id;
            session.createSQLQuery(deleteDetail).executeUpdate();
            String deleteLl = "delete from LingLiao where id=" + id;
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

    public boolean dealLingLiao(LingLiao lingLiao, Integer a01_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from LingLiaoDetail where ll_id=" + lingLiao.getId();
            List<LingLiaoDetail> list = session.createQuery(sql).list();
            Hashtable<Integer, LingLiaoDetail> detailTable = new Hashtable();
            StringBuilder sb = new StringBuilder();
            sb.append("(-1");
            for (LingLiaoDetail e : lingLiao.getDetails()) {
                detailTable.put(e.getKc_id(), e);
                sb.append(",");
                sb.append(e.getKc_id());
            }
            sb.append(")");
            String kcSql = "from KuCun where id in " + sb.toString();
            List<KuCun> kcList = session.createQuery(kcSql).list();
            for (KuCun kc : kcList) {
                LingLiaoDetail detail = detailTable.get(kc.getId());
                if (detail != null) {
                    if (kc.getSyzl() < detail.getSlzl()) {
                        tx.rollback();
                        result = false;
                        return result;
                    }
                    kc.setSyzl(kc.getSyzl() - detail.getSlzl());
                    kc.setSyl(kc.getSyl() - detail.getSll());
                    if (detail.getDymx() != null && !"".equals(detail.getDymx())) {
                        JSONArray detailDymx = JSONArray.parseArray(detail.getDymx());
                        JSONArray kcDymx = JSONArray.parseArray(kc.getDymx());
                        List<Integer> dxIds = new ArrayList();
                        for (int i = 0; i < detailDymx.size(); i++) {
                            JSONObject d = detailDymx.getJSONObject(i); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                            dxIds.add(d.getIntValue("id"));
                        }
                        for (int i = 0; i < kcDymx.size(); i++) {
                            JSONObject k = kcDymx.getJSONObject(i); // 遍历 jsonarray 数组，把每一个对象转成 json 对象
                            int id = k.getIntValue("id");
                            if (dxIds.contains(id)) {
                                k.remove("state");
                                k.put("state", 1);
                            }
                        }
                        System.out.println(kcDymx.toJSONString());
                        kc.setDymx(kcDymx.toJSONString());
                    }
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
