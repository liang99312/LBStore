/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.SunHao;
import com.lb.lbstore.domain.SunHaoDetail;
import com.lb.lbstore.domain.WuZiXhgg;
import com.lb.lbstore.domain.WuZiZiDian;
import com.lb.lbstore.util.LshUtil;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

@Repository
public class SunHaoDao extends BaseDao {

    public SunHao getSunHaoDetailById(Integer id) {
        SunHao sunHao = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {sh.*},ck.mc as ckmc,a01.mc as shrmc,a02.mc as sprmc from SunHao sh "
                    + "left join CangKu ck on sh.ck_id=ck.id "
                    + "left join A01 a01 on sh.shr_id=a01.id "
                    + "left join A01 a02 on sh.spr_id=a02.id "
                    + "where sh.id=" + id;
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("sh", SunHao.class)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("shrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<SunHao> list_sh = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                SunHao sh = (SunHao) objs[0];
                String ckmc = (String) objs[1];
                String shrmc = (String) objs[2];
                String sprmc = (String) objs[3];
                sh.setCkmc(ckmc);
                sh.setShrmc(shrmc);
                sh.setSprmc(sprmc);
                list_sh.add(sh);
            }
            if (list_sh.isEmpty()) {
                return null;
            }
            sunHao = list_sh.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from SunHaoDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.sh_id=" + id;
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.addEntity("d", SunHaoDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<SunHaoDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                SunHaoDetail shd = (SunHaoDetail) objs[0];
                String wzlb = (String) objs[1];
                shd.setWzlb(wzlb);
                details.add(shd);
            }
            sunHao.setDetails(details);
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
        return sunHao;
    }

    public List<SunHao> querySunHaosByPage(HashMap map) {
        List<SunHao> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {sh.*},ck.mc as ckmc from SunHao sh "
                    + "left join CangKu ck on sh.ck_id=ck.id "
                    + "where sh.qy_id=" + map.get("qy_id");
            if (map.containsKey("ck_id")) {
                sql += " and sh.ck_id = " + map.get("ck_id");
            }
            if (map.containsKey("lsh")) {
                sql += " and sh.lsh like '%" + map.get("lsh") + "%'";
            }
            if (map.containsKey("wz")) {
                sql += " and sh.wz like '%" + map.get("wz") + "%'";
            }
            if (map.containsKey("state")) {
                sql += " and sh.state = " + map.get("state");
            }
            if (map.containsKey("kh_id")) {
                sql += " and sh.kh_id = " + map.get("kh_id");
            }
            if (map.containsKey("gys_id")) {
                sql += " and sh.gys_id = " + map.get("gys_id");
            }
            if (map.containsKey("qrq")) {
                sql += " and sh.sj >= '" + map.get("qrq") + "'";
            }
            if (map.containsKey("zrq")) {
                sql += " and sh.sj <= '" + map.get("zrq") + " 23:59:59'";
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("sh", SunHao.class).addScalar("ckmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                SunHao sh = (SunHao) objs[0];
                String ckmc = (String) objs[1];
                sh.setCkmc(ckmc);
                result.add(sh);
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

    public Integer saveSunHao(SunHao sunHao) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(sunHao);
            session.flush();
            for (SunHaoDetail detail : sunHao.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setQy_id(sunHao.getQy_id());
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
                    xhgg.setQy_id(sunHao.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setCk_id(sunHao.getCk_id());
                detail.setQy_id(sunHao.getQy_id());
                detail.setSh_id(id);
                detail.setDh(sunHao.getDh());
                if ("pt".equals(detail.getJlfs())) {
                    detail.setShzl(detail.getShl());
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

    public boolean updateSunHao(SunHao sunHao) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(sunHao);
            session.flush();
            String deleteDetail = "delete from SunHaoDetail where sh_id=" + sunHao.getId();
            session.createSQLQuery(deleteDetail).executeUpdate();
            session.flush();
            for (SunHaoDetail detail : sunHao.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setQy_id(sunHao.getQy_id());
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
                    xhgg.setQy_id(sunHao.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setCk_id(sunHao.getCk_id());
                detail.setQy_id(sunHao.getQy_id());
                detail.setSh_id(sunHao.getId());
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

    public boolean deleteSunHao(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from SunHaoDetail where sh_id=" + id;
            session.createSQLQuery(deleteDetail).executeUpdate();
            String deleteLl = "delete from SunHao where id=" + id;
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

    public boolean dealSunHao(SunHao sunHao, Integer a01_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from SunHaoDetail where sh_id=" + sunHao.getId();
            List<SunHaoDetail> list = session.createQuery(sql).list();
            Hashtable<Integer, SunHaoDetail> detailTable = new Hashtable();
            StringBuilder sb = new StringBuilder();
            sb.append("(-1");
            for (SunHaoDetail e : sunHao.getDetails()) {
                detailTable.put(e.getKc_id(), e);
                sb.append(",");
                sb.append(e.getKc_id());
            }
            sb.append(")");
            String kcSql = "from KuCun where id in " + sb.toString();
            List<KuCun> kcList = session.createQuery(kcSql).list();
            for (KuCun kc : kcList) {
                SunHaoDetail detail = detailTable.get(kc.getId());
                if (detail != null) {
                    if (kc.getSyzl() < detail.getShzl()) {
                        tx.rollback();
                        result = false;
                        return result;
                    }
                    kc.setSyzl(kc.getSyzl() - detail.getShzl());
                    kc.setSyl(kc.getSyl() - detail.getShl());
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
            sunHao = (SunHao) session.load(SunHao.class, sunHao.getId());
            sunHao.setState(1);
            sunHao.setSpr_id(a01_id);
            sunHao.setSpsj(new Date());
            sunHao.setLsh(LshUtil.getShdLsh());
            session.update(sunHao);
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
