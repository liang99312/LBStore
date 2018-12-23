/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.dao;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.domain.HuanKu;
import com.lb.lbstore.domain.HuanKuDetail;
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
public class HuanKuDao extends BaseDao {

    public HuanKu getHuanKuDetailById(Integer id) {
        HuanKu huanKu = null;
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {hk.*},ck.mc as ckmc,a01.mc as hkrmc,a02.mc as sprmc from HuanKu hk "
                    + "left join CangKu ck on hk.ck_id=ck.id "
                    + "left join A01 a01 on hk.hkr_id=a01.id "
                    + "left join A01 a02 on hk.spr_id=a02.id "
                    + "where sh.id=" + id;
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("hk", HuanKu.class)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("hkrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<HuanKu> list_sh = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                HuanKu sh = (HuanKu) objs[0];
                String ckmc = (String) objs[1];
                String hkrmc = (String) objs[2];
                String sprmc = (String) objs[3];
                sh.setCkmc(ckmc);
                sh.setHkrmc(hkrmc);
                sh.setSprmc(sprmc);
                list_sh.add(sh);
            }
            if (list_sh.isEmpty()) {
                return null;
            }
            huanKu = list_sh.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from HuanKuDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.sh_id=" + id;
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.addEntity("d", HuanKuDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<HuanKuDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                HuanKuDetail shd = (HuanKuDetail) objs[0];
                String wzlb = (String) objs[1];
                shd.setWzlb(wzlb);
                details.add(shd);
            }
            huanKu.setDetails(details);
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
        return huanKu;
    }

    public List<HuanKu> queryHuanKusByPage(HashMap map) {
        List<HuanKu> result = new ArrayList();
        Session session = null;
        try {
            session = getSessionFactory().openSession();
            String sql = "select {hk.*},ck.mc as ckmc from HuanKu hk "
                    + "left join CangKu ck on hk.ck_id=ck.id "
                    + "where sh.qy_id=" + map.get("qy_id");
            if (map.containsKey("mc")) {
                sql += " and hk.wz like '%" + map.get("mc") + "%'";
            }
            if (map.containsKey("state")) {
                sql += " and hk.state = " + map.get("state");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.addEntity("hk", HuanKu.class).addScalar("ckmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                HuanKu sh = (HuanKu) objs[0];
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

    public Integer saveHuanKu(HuanKu huanKu) {
        Integer result = -1;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            Integer id = (Integer) session.save(huanKu);
            session.flush();
            for (HuanKuDetail detail : huanKu.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setQy_id(huanKu.getQy_id());
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
                    xhgg.setQy_id(huanKu.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setCk_id(huanKu.getCk_id());
                detail.setQy_id(huanKu.getQy_id());
                detail.setHk_id(id);
                detail.setDh(huanKu.getDh());
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

    public boolean updateHuanKu(HuanKu huanKu) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            session.update(huanKu);
            session.flush();
            String deleteDetail = "delete from HuanKuDetail where sh_id=" + huanKu.getId();
            session.createSQLQuery(deleteDetail).executeUpdate();
            session.flush();
            for (HuanKuDetail detail : huanKu.getDetails()) {
                Integer zd_id = detail.getWzzd_id();
                if (detail.getWzzd_id() < 1) {
                    WuZiZiDian zd = new WuZiZiDian();
                    zd.setDw(detail.getDw());
                    zd.setMc(detail.getWzmc());
                    zd.setQy_id(huanKu.getQy_id());
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
                    xhgg.setQy_id(huanKu.getQy_id());
                    xhgg.setWzzd_id(zd_id);
                    xhgg_id = (Integer) session.save(xhgg);
                    session.flush();
                    detail.setXhgg_id(xhgg_id);
                }

                detail.setCk_id(huanKu.getCk_id());
                detail.setQy_id(huanKu.getQy_id());
                detail.setHk_id(huanKu.getId());
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

    public boolean deleteHuanKu(Integer id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String deleteDetail = "delete from HuanKuDetail where sh_id=" + id;
            session.createSQLQuery(deleteDetail).executeUpdate();
            String deleteLl = "delete from HuanKu where id=" + id;
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

    public boolean dealHuanKu(HuanKu huanKu, Integer a01_id) {
        boolean result = false;
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from HuanKuDetail where sh_id=" + huanKu.getId();
            List<HuanKuDetail> list = session.createQuery(sql).list();
            Hashtable<Integer, HuanKuDetail> detailTable = new Hashtable();
            StringBuilder sb = new StringBuilder();
            sb.append("(-1");
            for (HuanKuDetail e : huanKu.getDetails()) {
                detailTable.put(e.getKc_id(), e);
                sb.append(",");
                sb.append(e.getKc_id());
            }
            sb.append(")");
            String kcSql = "from KuCun where id in " + sb.toString();
            List<KuCun> kcList = session.createQuery(kcSql).list();
            for (KuCun kc : kcList) {
                HuanKuDetail detail = detailTable.get(kc.getId());
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
                    //session.save(kc);
                }
            }
            session.flush();
            huanKu = (HuanKu) session.load(HuanKu.class, huanKu.getId());
            huanKu.setState(1);
            huanKu.setSpr_id(a01_id);
            huanKu.setSpsj(new Date());
            huanKu.setLsh(LshUtil.getLldLsh());
            session.update(huanKu);
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
