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
                    + "where hk.id=?";
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            navtiveSQL.setParameter(0, id);
            navtiveSQL.addEntity("hk", HuanKu.class)
                    .addScalar("ckmc", StandardBasicTypes.STRING)
                    .addScalar("hkrmc", StandardBasicTypes.STRING)
                    .addScalar("sprmc", StandardBasicTypes.STRING);
            List list = navtiveSQL.list();
            List<HuanKu> list_hk = new ArrayList();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                HuanKu hk = (HuanKu) objs[0];
                String ckmc = (String) objs[1];
                String hkrmc = (String) objs[2];
                String sprmc = (String) objs[3];
                hk.setCkmc(ckmc);
                hk.setHkrmc(hkrmc);
                hk.setSprmc(sprmc);
                list_hk.add(hk);
            }
            if (list_hk.isEmpty()) {
                return null;
            }
            huanKu = list_hk.get(0);

            String sql_d = "select {d.*},l.mc as wzlb from HuanKuDetail d left join WuZiLeiBie l on d.wzlb_id=l.id where d.hk_id=?";
            SQLQuery navtiveSQL_d = session.createSQLQuery(sql_d);
            navtiveSQL_d.setParameter(0, id);
            navtiveSQL_d.addEntity("d", HuanKuDetail.class).addScalar("wzlb", StandardBasicTypes.STRING);
            List<HuanKuDetail> details = new ArrayList();
            List list_d = navtiveSQL_d.list();
            for (Object obj : list_d) {
                Object[] objs = (Object[]) obj;
                HuanKuDetail hkd = (HuanKuDetail) objs[0];
                String wzlb = (String) objs[1];
                hkd.setWzlb(wzlb);
                details.add(hkd);
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
            List parameters = new ArrayList();
            parameters.add(map.get("qy_id"));
            session = getSessionFactory().openSession();
            String sql = "select {hk.*},ck.mc as ckmc from HuanKu hk "
                    + "left join CangKu ck on hk.ck_id=ck.id "
                    + "where hk.qy_id=?";
            if (map.containsKey("ck_id")) {
                sql += " and hk.ck_id = ?";
                parameters.add(map.get("ck_id"));
            }
            if (map.containsKey("lsh")) {
                sql += " and hk.lsh like ?";
                parameters.add("%" + map.get("lsh") + "%");
            }
            if (map.containsKey("wz")) {
                sql += " and hk.wz like ?";
                parameters.add("%" + map.get("wz") + "%");
            }
            if (map.containsKey("state")) {
                sql += " and hk.state = ?";
                parameters.add(map.get("state"));
            }
            if (map.containsKey("kh_id")) {
                sql += " and hk.kh_id = ?";
                parameters.add(map.get("kh_id"));
            }
            if (map.containsKey("gys_id")) {
                sql += " and hk.gys_id = ?";
                parameters.add(map.get("gys_id"));
            }
            if (map.containsKey("qrq")) {
                sql += " and hk.sj >= ?";
                parameters.add(map.get("qrq"));
            }
            if (map.containsKey("zrq")) {
                sql += " and hk.sj <= ?";
                parameters.add(map.get("zrq") + " 23:59:59");
            }
            SQLQuery navtiveSQL = session.createSQLQuery(sql);
            for (int i = 0; i < parameters.size(); i++) {
                navtiveSQL.setParameter(i, parameters.get(i));
            }
            navtiveSQL.addEntity("hk", HuanKu.class).addScalar("ckmc", StandardBasicTypes.STRING);
            navtiveSQL.setFirstResult(Integer.parseInt(map.get("beginRow").toString()));
            navtiveSQL.setMaxResults(Integer.parseInt(map.get("pageSize").toString()));
            List list = navtiveSQL.list();
            for (Object obj : list) {
                Object[] objs = (Object[]) obj;
                HuanKu hk = (HuanKu) objs[0];
                String ckmc = (String) objs[1];
                hk.setCkmc(ckmc);
                result.add(hk);
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
                detail.setCk_id(huanKu.getCk_id());
                detail.setQy_id(huanKu.getQy_id());
                detail.setHk_id(id);
                detail.setDh(huanKu.getDh());
                if ("pt".equals(detail.getJlfs())) {
                    detail.setHkzl(detail.getHkl());
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
            String deleteDetail = "delete from HuanKuDetail where hk_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, huanKu.getId()).executeUpdate();
            session.flush();
            for (HuanKuDetail detail : huanKu.getDetails()) {
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
            String deleteDetail = "delete from HuanKuDetail where hk_id=?";
            session.createSQLQuery(deleteDetail).setParameter(0, id).executeUpdate();
            String deleteLl = "delete from HuanKu where id=?";
            session.createSQLQuery(deleteLl).setParameter(0, id).executeUpdate();
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

    public String dealHuanKu(HuanKu huanKu, Integer a01_id) {
        String result = "1";
        Session session = null;
        Transaction tx = null;
        try {
            session = getSessionFactory().openSession();
            tx = session.beginTransaction();
            String sql = "from HuanKuDetail where hk_id=?";
            List<HuanKuDetail> list = session.createQuery(sql).setParameter(0, huanKu.getId()).list();
            Hashtable<Integer, HuanKuDetail> detailTable = new Hashtable();
            StringBuilder sb = new StringBuilder();
            sb.append("(-1");
            Hashtable<Integer, HuanKuDetail> LlDetailTable = new Hashtable();
            StringBuilder llSb = new StringBuilder();
            llSb.append("(-1");
            for (HuanKuDetail e : huanKu.getDetails()) {
                detailTable.put(e.getKc_id(), e);
                sb.append(",");
                sb.append(e.getKc_id());

                LlDetailTable.put(e.getLld_id(), e);
                llSb.append(",");
                llSb.append(e.getLld_id());
            }
            sb.append(")");
            llSb.append(")");

            String lldString = "select lld.id as id, lld.slzl-ifnull(h.zl,0) as sl from lingliaodetail lld, "
                    + "(select sum(ifnull(hkd.hkzl,0)) as zl,hkd.lld_id as lld_id from huankudetail hkd,huanku hk where hkd.hk_id=hk.id and hk.state=1 and hkd.lld_id in " + llSb + " group by hkd.lld_id) as h "
                    + "where lld.id=h.lld_id;";
            List lldList = session.createSQLQuery(lldString).list();
            for (Object obj : lldList) {
                Object[] objs = (Object[]) obj;
                Integer lld_id = (Integer) objs[0];
                Double sl = (Double) objs[1];
                HuanKuDetail detail = LlDetailTable.get(lld_id);
                if (detail != null) {
                    if (sl < detail.getHkzl()) {
                        result = "还库数量不能大于领料数量！";
                        tx.rollback();
                        return result;
                    }
                }
            }

            String kcSql = "from KuCun where id in " + sb.toString();
            List<KuCun> kcList = session.createQuery(kcSql).list();
            for (KuCun kc : kcList) {
                HuanKuDetail detail = detailTable.get(kc.getId());
                if (detail != null) {
                    if (kc.getSyzl() < detail.getHkzl()) {
                        tx.rollback();
                        result = "0";
                        return result;
                    }
                    kc.setSyzl(kc.getSyzl() + detail.getHkzl());
                    kc.setSyl(kc.getSyl() + detail.getHkl());
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
                                k.put("state", 0);
                            }
                        }
                        kc.setDymx(kcDymx.toJSONString());
                    }
                    //处理库存
                    session.save(kc);
                }
            }
            session.flush();
            huanKu = (HuanKu) session.load(HuanKu.class, huanKu.getId());
            huanKu.setState(1);
            huanKu.setSpr_id(a01_id);
            huanKu.setSpsj(new Date());
            huanKu.setLsh(LshUtil.getHkdLsh());
            session.update(huanKu);
            session.flush();
            tx.commit();
            result = "1";
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
